import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  FormControl,
  Input,
  Stack,
} from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import axios from "axios";
import "./resources.css";
import { toast } from "sonner";
import { ElearningContext } from "./context/ElearningContext";
import docx from "./assets/docx.png";
import pdf from "./assets/pdf.jpg";
import mp4 from "./assets/mp4.png";
import bird from "./assets/bird.mp4";
import { useIsPermitted } from "./hooks/useIsPermitted";

const Resources = () => {
  const {
    updateLoading,
    resources,
    setResources,
    role,
    recordings,
    setRecordings,
  } = useContext(ElearningContext);

  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [pdfData, setPdfData] = useState({
    title: "",
    subtitle: "",
    instructor: "",
    file: null,
  });

  // New state for recording modal data
  const [recordingOpen, setRecordingOpen] = useState(false);
  const [recordingData, setRecordingData] = useState({
    title: "",
    file: null,
  });

  const [openVideo, setOpenVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPdfData({
      title: "",
      subtitle: "",
      instructor: "",
      file: null,
    });
  };

  // Function to handle opening of the recording modal
  const handleRecordingOpen = () => {
    setRecordingOpen(true);
  };

  // Function to close recording modal and reset state
  const handleRecordingClose = () => {
    setRecordingOpen(false);
    setRecordingData({
      title: "",
      file: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPdfData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPdfData((prevData) => ({ ...prevData, file: e.target.files[0] }));
  };

  // New handler for recording input change
  const handleRecordingInputChange = (e) => {
    const { name, value } = e.target;
    setRecordingData((prevData) => ({ ...prevData, [name]: value }));
  };

  // New handler for recording file input change
  const handleRecordingFileChange = (e) => {
    setRecordingData((prevData) => ({ ...prevData, file: e.target.files[0] }));
  };

  const fetchResources = async () => {
    try {
      updateLoading(true);

      const response = await axios.get("http://localhost:3005/api/getPdfs", {
        withCredentials: true,
      });

      const { resources, success } = response.data;

      if (success) {
        setResources(resources);
      }
      updateLoading(false);
    } catch (error) {
      console.log(error.message);
      updateLoading(false);
    }
  };

  const fetchRecordings = async () => {
    try {
      updateLoading(true);

      const response = await axios.get(
        "http://localhost:3005/api/getRecordings",
        {
          withCredentials: true,
        }
      );

      const { recordings, success } = response.data;

      if (success) {
        setRecordings(recordings);
      }
      updateLoading(false);
    } catch (error) {
      console.log(error.message);
      updateLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
    fetchRecordings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", pdfData.title);
    formData.append("subtitle", pdfData.subtitle);
    formData.append("instructor", pdfData.instructor);
    formData.append("file", pdfData.file);

    try {
      updateLoading(true);
      const response = await axios.post(
        "http://localhost:3005/api/addPdf",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { resources, message, success } = response.data;

      setResources(resources);
      updateLoading(false);
      if (success) {
        toast.success(message);
        handleClose();
      } else {
        toast.error(message);
      }
    } catch (error) {
      updateLoading(false);
      console.error("Error uploading file", error);
    }
  };

  // New handler for recording submission
  const handleRecordingSubmit = async (e) => {
    e.preventDefault();

    if (!recordingData.title || !recordingData.file) {
      toast.error("Both fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", recordingData.title);
    formData.append("file", recordingData.file);

    try {
      updateLoading(true);
      const response = await axios.post(
        "http://localhost:3005/api/addRecording",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { message, success, recordings } = response.data;

      if (success) {
        toast.success(message);
        setRecordings(recordings);
      } else {
        toast.error(message);
      }

      updateLoading(false);
      if (success) {
        toast.success(message);
        handleRecordingClose();
      } else {
        toast.error(message);
      }
    } catch (error) {
      updateLoading(false);
      console.error("Error uploading recording", error);
    }
  };

  const [selectedFormat, setSelectedFormat] = useState("PDF");
  const handleCloseVideo = () => {
    URL.revokeObjectURL(videoUrl);
    setOpenVideo(false);
    setVideoUrl(null);
  };

  const DownloadCard = ({ file, title, subtitle, instructor }) => {
    // const name = file.name;

    // const type = name.split(".").pop();

    // const data = file.data;
    // const arr = [...data.data];
    // const uint8Array = new Uint8Array(arr);
    // const blob = new Blob([uint8Array], { type: "application/pdf" });

    // const pdfUrl = URL.createObjectURL(blob);

    const name = file.name;

    const extension = name.split(".").pop().toLowerCase();

    let mimeType;
    if (extension === "pdf") {
      mimeType = "application/pdf";
    } else if (extension === "docx") {
      mimeType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }

    const data = file.data;
    const arr = [...data.data];
    const uint8Array = new Uint8Array(arr);

    const blob = new Blob([uint8Array], { type: mimeType });

    const pdfUrl = URL.createObjectURL(blob);

    const downloadPdf = () => {
      try {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pdfUrl);
      } catch (error) {
        console.log(error.message);
      }
    };

    const openPdf = () => {
      try {
        const openUrl = URL.createObjectURL(blob);

        window.open(openUrl, "_blank");
        URL.revokeObjectURL(openUrl);
      } catch (error) {
        console.log(error.message);
      }
    };

    const isHandsOn = () => extension == "mp4";

    const handlePlay = () => {
      try {
        setVideoUrl(file.filename); // Set the video URL for dialog display
        setOpenVideo(true); // Open the dialog
      } catch (error) {
        console.error("Error playing video:", error.message);
      }
    };

    const downloadVideo = () => {
      try {
        const url = `http://localhost:3005/uploads/${file.filename}`;

        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank"; // Opens in a new window or tab

        document.body.appendChild(a);
        a.click();
        a.remove();
        console.log("Video opened in a new window successfully");
      } catch (error) {
        console.error("Error opening video:", error.message);
      }
    };

    return (
      <div className="download-card">
        <img
          style={{ width: "70px", height: "70px" }}
          src={isHandsOn() ? mp4 : extension === "pdf" ? pdf : docx}
          alt={title}
          className="card-image"
        />
        <div className="card-content">
          <h3>{title}</h3>

          {!isHandsOn() && (
            <>
              {" "}
              <p>{subtitle}</p>
              <p>Instructor: {instructor}</p>
            </>
          )}

          {isHandsOn() && (
            <button className="play-button" onClick={handlePlay}>
              ▶ Play
            </button>
          )}
          <div className="download-buttons">
            {!isHandsOn() && <button onClick={openPdf}>Open</button>}
            <button onClick={isHandsOn() ? downloadVideo : downloadPdf}>
              Download
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Downloads = ({ downloads, format }) => {
    const filteredDownloads = downloads.filter((item) => {
      if (format === "PDF") {
        return item.type.includes("PDF");
      } else if (format === "Hands-on Sessions") {
        return item.type.includes("recordings");
      }
      return true;
    });

    return (
      <div className="downloads-list">
        {filteredDownloads.length > 0 ? (
          filteredDownloads.map((item, index) => (
            <DownloadCard key={index} {...item} />
          ))
        ) : (
          <p>No downloads available for this format.</p>
        )}
      </div>
    );
  };

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  // const isPermitted = () => {
  //   if (role == "admin" || role == "instructor") {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <div className="resources-container">
      <Stack direction="row" display="flex" justifyContent="space-between">
        <div className="downloads-header">
          <h2>Downloads</h2>
          <div className="dropdown">
            <select value={selectedFormat} onChange={handleFormatChange}>
              <option value="PDF">PDF</option>
              <option value="Hands-on Sessions">Hands-on Sessions</option>
            </select>
          </div>
        </div>

        {useIsPermitted(role) && (
          <div className="create-btn-container">
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Upload PDF/.DOCX
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRecordingOpen}
              style={{ marginLeft: "10px" }}
            >
              Upload Recording
            </Button>
          </div>
        )}
      </Stack>

      {selectedFormat !== "PDF" ? (
        <Downloads downloads={recordings} format={selectedFormat} />
      ) : (
        <Downloads downloads={resources} format={selectedFormat} />
      )}

      {/* Existing PDF Modal code remains unchanged */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New PDF</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              label="PDF/DOCX Title"
              type="text"
              fullWidth
              name="title"
              value={pdfData.title}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              label="PDF/DOCX Subtitle"
              type="text"
              fullWidth
              name="subtitle"
              value={pdfData.subtitle}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              label="Instructor Name"
              type="text"
              fullWidth
              name="instructor"
              value={pdfData.instructor}
              onChange={handleInputChange}
              required
            />
            <FormControl fullWidth margin="dense">
              {/* <InputLabel>Upload File (.docx or .pdf)</InputLabel> */}
              <Input type="file" onChange={handleFileChange} required />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Recording Modal */}
      <Dialog open={recordingOpen} onClose={handleRecordingClose}>
        <DialogTitle>Upload Recording</DialogTitle>
        <DialogContent>
          <form onSubmit={handleRecordingSubmit}>
            <TextField
              margin="dense"
              label="Recording Title"
              type="text"
              fullWidth
              name="title"
              value={recordingData.title}
              onChange={handleRecordingInputChange}
              required
            />
            <FormControl fullWidth margin="dense">
              <Input
                type="file"
                onChange={handleRecordingFileChange}
                required
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRecordingClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRecordingSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openVideo} onClose={handleCloseVideo} maxWidth="md">
        <IconButton
          size="50px"
          color="red"
          style={{ position: "absolute", zIndex: 10, top: 2, right: 8 }}
          onClick={handleCloseVideo}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent style={{ display: "flex", justifyContent: "center" }}>
          {videoUrl && (
            <video
              src={`http://localhost:3005/uploads/${videoUrl}`}
              controls
              autoPlay
              style={{ maxWidth: "100%", maxHeight: "80vh" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;

