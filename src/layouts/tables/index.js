import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce"; // Importing debounce hook
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// API
import { Api } from "Api/Api"; // Adjust the import path based on your project structure.

function Tables() {
  const [rows, setRows] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0); // Total users count for pagination
  const [currentPage, setCurrentPage] = useState(1); // Start with page 1
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500); // Adding debounce

  const fetchUsers = async (page = 1, limit = 10, search = "") => {
    try {
      setLoading(true);
      const response = await Api.getAllUsers({ page, limit, search }); // Pass search term to the API
      const { users, totalUsers } = response;
      setRows(users); // Set the fetched users directly as rows
      setTotalUsers(totalUsers); // Set total users count for pagination
    } catch (err) {
      setError("Failed to fetch user data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, rowsPerPage, debouncedSearch);
  }, [currentPage, rowsPerPage, debouncedSearch]);

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Users Table
                </MDTypography>
              </MDBox>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={search}
                onChange={handleSearchChange}
                margin="normal"
                sx={{ margin: "16px", width: "15%" }}
              />
              <MDBox pt={3}>
                {loading ? (
                  <MDBox display="flex" justifyContent="center" py={6}>
                    <CircularProgress color="primary" />
                  </MDBox>
                ) : error ? (
                  <MDTypography variant="body1" align="center" color="error">
                    {error}
                  </MDTypography>
                ) : (
                  <Fade in={true} timeout={500}>
                    <div>
                      <DataTable
                        table={{
                          columns: [
                            { Header: "Profile Image", accessor: "profileImage", align: "left" },
                            { Header: "Name", accessor: "name", align: "left" },
                            { Header: "Phone", accessor: "phone", align: "left" },
                            { Header: "Status", accessor: "status", align: "left" },
                            { Header: "CreatedAt", accessor: "datetime", align: "left" },
                          ],
                          rows: rows.map((user) => ({
                            profileImage: (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={user.profile_pic || "/default-profile.png"}
                                  alt="Profile"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    marginRight: "10px",
                                  }}
                                />
                                <MDTypography variant="body1" style={{ fontSize: "14px" }}>
                                  {user.name}
                                </MDTypography>
                              </div>
                            ),
                            name: user.name,
                            phone: user.phone,
                            status: user.status,
                            datetime: user.datetime,
                          })),
                        }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                      <MDBox display="flex" justifyContent="center" m={3}>
                        <Stack spacing={2}>
                          <Pagination
                            count={Math.ceil(totalUsers / rowsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            shape="rounded"
                            siblingCount={1}
                            boundaryCount={1}
                            showFirstButton
                            showLastButton
                          />
                        </Stack>
                      </MDBox>
                    </div>
                  </Fade>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
