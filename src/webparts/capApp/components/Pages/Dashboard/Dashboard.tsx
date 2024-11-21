import { SPFI } from "@pnp/sp";
import * as React from "react";
import { CourseService } from "../../services/CourseService";
import { ICourse } from "../../types";
import { MessageBar, MessageBarType } from "@fluentui/react";
import { ChartControl, ChartType } from "@pnp/spfx-controls-react";
import { Col, Container, Row } from "react-bootstrap";

interface IDashboardProps {
  sp: SPFI;
}

interface IChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

// const options = {
//   legend: {
//     display: true,
//     position: "left",
//   },
//   title: {
//     display: true,
//     text: "Course",
//   },
// };
const Dashboard: React.FC<IDashboardProps> = ({ sp }) => {
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [message, setMessage] = React.useState<{
    text: string;
    type: MessageBarType;
  } | null>(null);
  const [datapoints, setDatapoints] = React.useState({
    CourseNames: {} as IChartData,
  });

  const courseService = new CourseService(sp);

  const showMessage = (text: string, type: MessageBarType): void => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const getCount = (arr: any[], key: string) => {
    const data: { [key: string]: number } = arr.reduce(
      (acc, o) => ((acc[o[key]] = (acc[o[key]] || 0) + 1), acc),
      {}
    );

    Object.keys(data).forEach((key) => {
      if (key === "null") {
        delete data[key];
      }
    });

    const datapoints = {
      labels: Object.keys(data),
      datasets: [
        {
          label: "Course Count",
          data: Object.values(data),
        },
      ],
    };
    console.log(datapoints);
    return datapoints;
  };
  const loadData = async (): Promise<void> => {
    try {
      const [coursesData] = await Promise.all([courseService.getCourses()]);

      setCourses(coursesData);
      const CourseCount = getCount(coursesData, "Title");
      setDatapoints({
        CourseNames: CourseCount,
      });

      console.log(CourseCount);
    } catch (error) {
      showMessage("Error loading data", MessageBarType.error);
      console.log(error);
    }
  };

  // React.useEffect(() => {
  //   // eslint-disable-next-line no-void
  //   void loadData();
  // }, []);
  const data: IChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First Dataset",
        data: [10, 50, 20, 60, 30, 70, 40],
      },
    ],
  };

  const options = {
    legend: {
      display: true,
      position: "left",
    },
    title: {
      display: true,
      text: "Course Registrations",
    },
  };

  const bardata = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Course End Dates",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const baroptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      {message && (
        <MessageBar messageBarType={message.type}>{message.text}</MessageBar>
      )}
      <Container>
        <Row>
          <h3 style={{ marginBottom: "3rem" }}>DashBoard</h3>
        </Row>
        <Row>
          <Col sm="6">
            <ChartControl type={ChartType.Pie} data={data} options={options} />
          </Col>
          <Col sm="6">
            <ChartControl
              type={ChartType.Bar}
              data={bardata}
              options={baroptions}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
