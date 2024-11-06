import React, { useContext, useEffect, useState } from "react";
import "../../pdash.css";
import axios from "axios";
import { toast } from "sonner";
import {
  Stack,
  Typography,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ElearningContext } from "../../context/ElearningContext";

export const AdminsGrade = () => {
  const { grades, setGrades, updateLoading, loading } =
    useContext(ElearningContext);
  const [year, setYear] = useState("");
  const [admNumber, setAdmNumber] = useState("");
  const [sem1, setSem1] = useState("");
  const [sem2, setSem2] = useState("");
  const [open, setOpen] = useState(false); // For modal control
  const [editId, setEditId] = useState(null); // Track the row being edited

  const fetchGrades = async () => {
    try {
      updateLoading(true);

      const response = await axios.get("http://localhost:3005/api/getGrades");
      let { grades } = response.data;

      // Process each student's grades to only show the latest available year
      const processedGrades = grades.map((grade) => {
        let latestYear = "";
        let sem1 = "";
        let sem2 = "";

        for (let i = 4; i >= 1; i--) {
          const yearKey = `yr${i}`;
          if (grade[yearKey]?.semester1 || grade[yearKey]?.semester2) {
            latestYear = `${i}`; // Set latest available year
            sem1 = grade[yearKey]?.semester1 || "";
            sem2 = grade[yearKey]?.semester2 || "";
            break;
          }
        }

        return {
          id: grade._id,
          admNumber: grade.admNumber,
          year: latestYear,
          sem1: sem1,
          sem2: sem2,
        };
      });

      setGrades(processedGrades);
      updateLoading(false);
    } catch (e) {
      updateLoading(false);
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const years = [
    { label: "1st Year", value: "1" },
    { label: "2nd Year", value: "2" },
    { label: "3rd Year", value: "3" },
    { label: "4th Year", value: "4" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateLoading(true);
      const response = await axios.post(
        "http://localhost:3005/api/uploadGrades",
        {
          year,
          admNumber,
          sem1,
          sem2,
        },
        { withCredentials: true }
      );

      const { success, message, grades } = response.data;

      if (success) {
        const processedGrades = grades.map((grade) => {
          let latestYear = "";
          let sem1 = "";
          let sem2 = "";

          for (let i = 4; i >= 1; i--) {
            const yearKey = `yr${i}`;
            if (grade[yearKey]?.semester1 || grade[yearKey]?.semester2) {
              latestYear = `${i}`; // Set latest available year
              sem1 = grade[yearKey]?.semester1 || "";
              sem2 = grade[yearKey]?.semester2 || "";
              break;
            }
          }

          return {
            id: grade._id,
            admNumber: grade.admNumber,
            year: latestYear,
            sem1: sem1,
            sem2: sem2,
          };
        });

        setGrades(processedGrades);
        toast.success(message);
        setYear("");
        setAdmNumber("");
        setSem1("");
        setSem2("");
        setOpen(false);
        setEditId(null);
      } else {
        toast.error("Something went wrong");
      }
      updateLoading(false);
    } catch (error) {
      updateLoading(false);
      console.error(error.message);
    }
  };

  const handleEdit = async (id) => {
    const grade = grades.find((g) => g.id === id);
    setAdmNumber(grade.admNumber);
    setYear(grade.year);
    setSem1(grade.sem1);
    setSem2(grade.sem2);
    setEditId(id);
    setOpen(true);

    try {
      updateLoading(true);

      const response = await axios.post("http://locahost:3005/api/editGrade", {
        id,
        year,
        admNumber,
        sem1,
        sem2,
      });
      const { success, grades, message } = response.data;
      if (success) {
        const processedGrades = grades.map((grade) => {
          let latestYear = "";
          let sem1 = "";
          let sem2 = "";

          for (let i = 4; i >= 1; i--) {
            const yearKey = `yr${i}`;
            if (grade[yearKey]?.semester1 || grade[yearKey]?.semester2) {
              latestYear = `${i}`; // Set latest available year
              sem1 = grade[yearKey]?.semester1 || "";
              sem2 = grade[yearKey]?.semester2 || "";
              break;
            }
          }

          return {
            id: grade._id,
            admNumber: grade.admNumber,
            year: latestYear,
            sem1: sem1,
            sem2: sem2,
          };
        });

        setGrades(processedGrades);
        toast.success(message);
        setYear("");
        setAdmNumber("");
        setSem1("");
        setSem2("");
        setOpen(false);
        setEditId(null);
      } else {
        toast.error("Something went wrong");
      }
      updateLoading(false);
    } catch (e) {
      updateLoading(false);

      console.log(e.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      updateLoading(true);
      const response = await axios.delete(
        `http://localhost:3005/api/grades/${id}`
      );
      if (response.data.success) {
        setGrades(grades.filter((g) => g.id !== id));
        toast.success("Grade deleted successfully");
      }
      updateLoading(false);
    } catch (error) {
      updateLoading(false);
      console.error(error.message);
    }
  };

  const columns = [
    { field: "admNumber", headerName: "Admission Number", width: 180 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "sem1", headerName: "1st Semester", width: 180 },
    { field: "sem2", headerName: "2nd Semester", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h5">Latest Year Student's Grades</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ alignSelf: "flex-end" }}
      >
        Upload Student's Grade
      </Button>
      {!grades.length < 1 ? (
        <Box sx={{ height: 400, width: "100%", mt: 3 }}>
          <DataGrid
            rows={grades}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            getRowId={(row) => row.admNumber || row.id} // Use admNumber if id is missing
            sx={{
              "& .MuiDataGrid-cell": { outline: "none" },
            }}
          />
        </Box>
      ) : (
        <Stack
          width="100%"
          height="400px"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>Nothing here yet</Typography>
        </Stack>
      )}
      {/* Table displaying grades */}

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Stack spacing={2} width="100%">
            <TextField
              label="Admission Number"
              value={admNumber}
              onChange={(e) => setAdmNumber(e.target.value)}
              required
            />
            <TextField
              label="Year"
              select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            >
              {years.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="1st Semester Grade"
              value={sem1}
              onChange={(e) => setSem1(e.target.value)}
              required
            />
            <TextField
              label="2nd Semester Grade"
              value={sem2}
              onChange={(e) => setSem2(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                `Upload for ${year} Year`
              )}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};
