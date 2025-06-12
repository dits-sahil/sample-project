import { useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { BarChart, type BarChartProps } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import Stack from "@mui/material/Stack";

import {
  addLabels,
  balanceSheet,
} from "../../configs/chartConfig/charts.config";
import { PieChart } from "@mui/x-charts";

const Dashboard = () => {
  const config: Partial<BarChartProps> = {
    height: 350,
    margin: { left: 40 },
    hideLegend: true,
  };
  const [connectNulls] = useState(true);
  return (
    <>
      <h1 style={{ textAlign: "left" }}>Dashboard</h1>
      <Box sx={{ borderColor: "#eee" }}>
        <Paper>
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={3}
                style={{ flex: 1, padding: 16, textAlign: "center" }}
              >
                <BarChart
                  dataset={balanceSheet}
                  series={addLabels([
                    { dataKey: "currAss", stack: "assets" },
                    { dataKey: "nCurrAss", stack: "assets" },
                    { dataKey: "curLia", stack: "liability" },
                    { dataKey: "nCurLia", stack: "liability" },
                    { dataKey: "capStock", stack: "equity" },
                    { dataKey: "retEarn", stack: "equity" },
                    { dataKey: "treas", stack: "equity" },
                  ])}
                  xAxis={[{ dataKey: "year" }]}
                  yAxis={[{ width: 80 }]}
                  {...config}
                />
              </Paper>
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={3}
                style={{ flex: 1, padding: 16, textAlign: "center" }}
              >
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5],
                      area: true,
                    },
                  ]}
                  height={350}
                />
              </Paper>
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <Paper elevation={3} style={{ padding: 16, textAlign: "center" }}>
                <Stack sx={{ width: "100%" }}>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16, 18, 20] }]}
                    series={[
                      {
                        data: [2, 5, 6.5, 3, 8, 10, 9.5, 2.5, 6, 10, 8],
                      },
                      {
                        data: [null, null, 5.5, 2, null, null, 8.5, 1.5, 5],
                        connectNulls,
                        area: true,
                      },
                    ]}
                    height={450}
                    margin={{ bottom: 10 }}
                    skipAnimation
                  />
                </Stack>
              </Paper>
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <Paper elevation={3} style={{ padding: 16, textAlign: "center" }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: "series A" },
                        { id: 1, value: 15, label: "series B" },
                        { id: 2, value: 20, label: "series C" },
                      ],
                    },
                  ]}
                  width={400}
                  height={450}
                />
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Dashboard;
