import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Button, Typography } from "@material-tailwind/react";
import PrintingConfig from "../components/PrintingConfig";
import { useParams } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const maxWidth = 500;

const FilePreviewPage = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();
  const { id } = useParams();

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  const resizeObserverOptions = {};

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="grid grid-cols-5 items-start">
      <div
        ref={setContainerRef}
        className="col-span-3 flex flex-col items-center self-end"
      >
        <Document
          file={`http://localhost:5000/file/store/${id}`}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          <Page
            pageNumber={pageNumber}
            width={
              containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
            }
            className="border-4 border-blue-gray-600"
          />
        </Document>
        <div className="mt-10 flex flex-col items-center">
          <Typography variant="h6">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </Typography>
          <div>
            <Button
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className="me-10"
            >
              Previous
            </Button>
            <Button disabled={pageNumber >= numPages} onClick={nextPage}>
              Next
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-2 justify-self-center">
        <PrintingConfig fileId={id} numPages={numPages}/>
      </div>
    </div>
  );
};

export default FilePreviewPage;
