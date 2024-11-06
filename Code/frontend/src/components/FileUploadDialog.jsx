import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import {
  useCreateFileMutation,
  useStoreFileMutation,
} from "../slices/fileApiSlice";
import { PDFDocument } from "pdf-lib";

const getPageCount = (file) => {
  return new Promise((resolve, reject) => {
    if (file.type === "application/pdf") {
      // Only get page count for PDFs
      const reader = new FileReader();
      reader.onload = async function (e) {
        const arrayBuffer = e.target.result;
        const pdf = await PDFDocument.load(arrayBuffer);
        resolve(pdf.getPageCount());
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    } else {
      resolve(1); // Assume non-PDF files have 1 page
    }
  });
};

const FileUploadDialog = ({ open, handleOpen, printerId }) => {
  const [files, setFiles] = useState([]);
  const { _id: userId } = useSelector((state) => state.auth.userData);

  const [createFile] = useCreateFileMutation();
  const [storeFile] = useStoreFileMutation();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    const mimeToFileTypeMap = {
      // Text
      "text/plain": "txt",
      "text/html": "html",
      "text/css": "css",
      "text/javascript": "js",
      "application/json": "json",
      "application/xml": "xml",

      // Images
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "image/webp": "webp",
      "image/svg+xml": "svg",
      "image/bmp": "bmp",
      "image/tiff": "tiff",
      "image/x-icon": "ico",
      "image/vnd.microsoft.icon": "ico",

      // Audio
      "audio/midi": "midi",
      "audio/mpeg": "mp3",
      "audio/webm": "webm",
      "audio/ogg": "ogg",
      "audio/wav": "wav",

      // Video
      "video/mp4": "mp4",
      "video/mpeg": "mpeg",
      "video/webm": "webm",
      "video/ogg": "ogv",
      "video/3gpp": "3gp",
      "video/3gpp2": "3g2",

      // Application files
      "application/pdf": "pdf",
      "application/msword": "doc",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "docx",
      "application/vnd.ms-excel": "xls",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "xlsx",
      "application/vnd.ms-powerpoint": "ppt",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        "pptx",
      "application/zip": "zip",
      "application/x-7z-compressed": "7z",
      "application/x-rar-compressed": "rar",
      "application/x-tar": "tar",
      "application/x-gzip": "gz",
      "application/x-bzip": "bz",
      "application/x-bzip2": "bz2",

      // Font files
      "font/otf": "otf",
      "font/ttf": "ttf",
      "font/woff": "woff",
      "font/woff2": "woff2",

      // Miscellaneous
      "application/octet-stream": "bin",
      "application/x-sh": "sh",
      "application/x-csh": "csh",
      "application/xhtml+xml": "xhtml",
      "application/rtf": "rtf",
      "application/x-msdownload": "exe",
      "application/vnd.android.package-archive": "apk",

      // Archives
      "application/x-apple-diskimage": "dmg",
      "application/x-iso9660-image": "iso",
    };

    const errorFiles = []; // Array to store files with errors

    for (let file of files) {
      let fileType = mimeToFileTypeMap[file.type] || "unknown";
      const pageNum = fileType === "pdf" ? await getPageCount(file) : 1;

      const fileData = {
        name: file.name,
        type: fileType,
        userId: userId,
        printerId: printerId,
        pageNum: pageNum,
      };

      try {
        // Attempt to create the file entry in the backend
        const { data } = await createFile(fileData);

        if (!data || !data.fileId) {
          console.error(`Failed to get fileId for ${file.name}`);
          errorFiles.push(file.name); // Add file name to error list
          continue;
        }

        const fileId = data.fileId;

        // Only proceed with storing the file if the creation was successful
        const formData = new FormData();
        formData.append("files", file); // Use "files" here to match multer configuration
        formData.append("_id", fileId);

        await storeFile(formData);
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        errorFiles.push(file.name); // Add file name to error list
      }
    }

    // Check if there are any files with errors
    if (errorFiles.length > 0) {
      alert(`The following files failed to upload: ${errorFiles.join(", ")}`);
    } else {
      alert("All files uploaded successfully.");
    }

    setFiles([]); // Clear files after submission
    handleOpen();
    window.location.reload(); // Refresh to update the file list if no error occurs
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>File Upload</DialogHeader>
      <DialogBody className="flex flex-col gap-3">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".pdf, .jpg, .png, .doc, .docx, .pptx, .txt, .xls, .xlsx, .svg" // Allow multiple file types
        />
        {files.length > 0 && (
          <div className="flex flex-col gap-2">
            {files.map((file, index) => (
              <div key={index} className="text-sm">
                {file.name}
              </div>
            ))}
          </div>
        )}
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="blue" onClick={handleSubmit}>
          <span>OK</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default FileUploadDialog;
