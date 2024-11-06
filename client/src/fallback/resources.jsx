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
import { Link } from "react-router-dom";
import axios from "axios";
import "./resources.css";
import { toast } from "sonner";
import { ElearningContext } from "./context/ElearningContext";
import docx from "./assets/docx.png";
import pdf from "./assets/pdf.jpg";

const Resources = () => {
  const { updateLoading, resources, setResources, role } =
    useContext(ElearningContext);

  const [downloads, setDownloads] = useState([
    {
      title: "Listening and Comprehension (PDF)",
      description: "Networking; Introduction to Networking",
      imgSrc: "/pdfff.png",
      instructor: "Dr. Siele",
    },
    {
      title: "Basic Grammar and Vocabulary (Hands-on)",
      description: "Introduction to UI/UX Designing with Amos",
      imgSrc: "/ix.png",
      instructor: "Amos",
    },
    {
      title: "Everyday Conversations (PDF)",
      description: "Information systems; introduction to Information Systems",
      imgSrc: "/pdfff.png",
      instructor: "Dr. Kogo",
    },
  ]);

  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [pdfData, setPdfData] = useState({
    title: "",
    subtitle: "",
    instructor: "",
    file: null,
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPdfData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPdfData((prevData) => ({ ...prevData, file: e.target.files[0] }));
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

  useEffect(() => {
    fetchResources();
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

  const [selectedFormat, setSelectedFormat] = useState("PDF");

  const DownloadCard = ({ file, title, subtitle, imgSrc, instructor }) => {
    const name = file.name;

    const type = name.split(".")[1];

    const data = file.data;
    const arr = [...data.data];
    const uint8Array = new Uint8Array(arr);
    const blob = new Blob([uint8Array], { type: "application/pdf" });

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

    const isHandsOn = title.includes("Hands-on");

    const handlePlay = () => {
      // Functionality for the play button
      alert(`Playing content for: ${title}`);
    };

    return (
      <div className="download-card">
        <img
          style={{ width: "70px", height: "70px" }}
          src={type == "pdf" ? pdf : docx}
          alt={title}
          className="card-image"
        />
        <div className="card-content">
          <h3>{title}</h3>
          <p>{subtitle}</p>
          <p>Instructor: {instructor}</p>
          {isHandsOn && (
            <button className="play-button" onClick={handlePlay}>
              ▶ Play
            </button>
          )}
          <div className="download-buttons">
            <button onClick={openPdf}>Open</button>
            <button onClick={downloadPdf}>Download</button>
          </div>
        </div>
      </div>
    );
  };

  const Downloads = ({ downloads, format }) => {
    const filteredDownloads = downloads.filter((item) => {
      if (format === "PDF") {
        return item.type.includes("PDF"); // Example condition to check for PDFs
      } else if (format === "Hands-on Sessions") {
        return item.title.includes("Hands-on"); // Example condition for hands-on sessions
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

  return (
    <div className="resources-container">
      {/* Downloads Header with Dropdown */}

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

        {role == "admin" && (
          <div className="create-pdf-btn-container">
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Upload PDF | .DOCX
            </Button>
          </div>
        )}
      </Stack>

      {/* Downloads List with Selected Format */}
      <Downloads downloads={resources} format={selectedFormat} />

      {/* Modal for PDF Creation */}
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
    </div>
  );
};

export default Resources;
