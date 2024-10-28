import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

const CookieDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="filled"
        size="sm"
        className="text-md bg-[#b8c1ca] font-normal normal-case text-black"
      >
        Cookies notice
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Cookies must be enabled in your browser.</DialogHeader>
        <DialogBody className="flex flex-col gap-3">
          <Typography>Two cookies are used on this site:</Typography>
          <Typography>
            The essential one is the session cookie, usually called
            MoodleSession. You must allow this cookie in your browser to provide
            continuity and to remain logged in when browsing the site. When you
            log out or close the browser, this cookie is destroyed (in your
            browser and on the server).
          </Typography>
          <Typography>
            The other cookie is purely for convenience, usually called MOODLEID
            or similar. It just remembers your username in the browser. This
            means that when you return to this site, the username field on the
            login page is already filled in for you. It is safe to refuse this
            cookie - you will just have to retype your username each time you
            log in.
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="blue" onClick={handleOpen}>
            <span>OK</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default CookieDialog;
