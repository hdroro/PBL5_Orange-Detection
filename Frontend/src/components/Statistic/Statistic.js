/* eslint-disable default-case */
/* eslint-disable no-loop-func */
import ContainerWrapper from "../ContainerWrapper/ContainerWrapper";
import {
  DoubleCheckIcon,
  FilterIcon,
  FruitIcon,
  IncreaseIcon,
} from "../Icon/Icon";
import ColumnChart from "./ColumnChart";
import "./Statistic.scss";
import database from "../../config/firebaseConfig";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import {
  subDays,
  subMonths,
  subYears,
  startOfWeek,
  startOfMonth,
  startOfYear,
  format,
} from "date-fns";

function Statistic() {
  const [totalFruits, setTotalFruits] = useState(0);
  const [freshRatio, setFreshRatio] = useState(0);
  const [rottenRatio, setRottenRatio] = useState(0);
  const [valueOption, setValueOption] = useState("1");

  const [totalFreshFilter, setTotalFreshFilter] = useState([]);
  const [totalRottenFilter, setTotalRottenFilter] = useState([]);
  const [periodOption, setPeriodOption] = useState("ngày");

  useEffect(() => {
    const dbRef = ref(database);

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      if (data && data.images_info) {
        const imageInfo = data.images_info;

        let totalFresh = 0;
        let totalRotten = 0;
        let total = 0;
        Object.values(imageInfo).forEach((info) => {
          if (info.result === 1) {
            totalRotten++;
          } else if (info.result === 0) {
            totalFresh++;
          }
        });

        total = totalFresh + totalRotten;

        if (total !== 0) {
          setRottenRatio((totalRotten * 100) / total);
          setFreshRatio((totalFresh * 100) / total);
        }
        setTotalFruits(totalFresh + totalRotten);
      }
    });
  }, []);

  useEffect(() => {
    const dbRef = ref(database);

    const fetchDataForTimePeriod = (startDate, endDate, period) => {
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();

        if (data && data.images_info) {
          const imageInfo = data.images_info;

          let freshData = [];
          let rottenData = [];

          let loopStart, loopEnd, incrementDate;

          switch (period) {
            case "ngày":
              loopStart = new Date(startDate);
              loopEnd = endDate;
              incrementDate = (date) => date.setDate(date.getDate() + 1);
              break;
            case "tuần":
              loopStart = new Date(startDate);
              loopEnd = endDate;
              incrementDate = (date) => date.setDate(date.getDate() + 7);
              break;
            case "tháng":
              loopStart = new Date(startDate);
              loopEnd = endDate;
              incrementDate = (date) => date.setMonth(date.getMonth() + 1);
              break;
            case "năm":
              loopStart = new Date(startDate);
              loopEnd = endDate;
              incrementDate = (date) =>
                date.setFullYear(date.getFullYear() + 1);
              break;
            default:
              throw new Error("Error");
          }

          for (
            let periodStart = loopStart;
            periodStart <= loopEnd;
            incrementDate(periodStart)
          ) {
            let periodEnd;

            switch (period) {
              case "ngày":
                periodEnd = new Date(periodStart);
                break;
              case "tuần":
                periodEnd = new Date(periodStart);
                periodEnd.setDate(periodEnd.getDate() + 6);
                break;
              case "tháng":
                periodEnd = new Date(periodStart);
                periodEnd.setMonth(periodEnd.getMonth() + 1);
                periodEnd.setDate(0);
                break;
              case "năm":
                periodEnd = new Date(periodStart);
                periodEnd.setFullYear(periodEnd.getFullYear() + 1);
                periodEnd.setDate(0);
                break;
              default:
                throw new Error("Error");
            }

            let totalFreshInPeriod = 0;
            let totalRottenInPeriod = 0;

            for (
              let date = new Date(periodStart);
              date <= periodEnd;
              date.setDate(date.getDate() + 1)
            ) {
              const dateString = format(date, "yyyy-MM-dd");

              let totalFreshOnDate = 0;
              let totalRottenOnDate = 0;

              Object.values(imageInfo).forEach((info) => {
                const imageDate = info.time_predict.split(".")[0].split(" ")[0];
                const result = info.result;

                if (imageDate === dateString) {
                  if (result === 0) {
                    totalFreshOnDate++;
                  } else if (result === 1) {
                    totalRottenOnDate++;
                  }
                }
              });

              totalFreshInPeriod += totalFreshOnDate;
              totalRottenInPeriod += totalRottenOnDate;
            }

            freshData.push(totalFreshInPeriod);
            rottenData.push(totalRottenInPeriod);
          }

          setTotalFreshFilter(freshData);
          setTotalRottenFilter(rottenData);
        }
      });
    };

    var endDate = new Date();
    var startDate = new Date();

    switch (valueOption) {
      case "1":
        startDate = subDays(endDate, 3);
        fetchDataForTimePeriod(startDate, endDate, "ngày");
        break;
      case "2":
        startDate = startOfWeek(subDays(endDate, 21));
        fetchDataForTimePeriod(startDate, endDate, "tuần");
        break;
      case "3":
        startDate = startOfMonth(subMonths(endDate, 3));
        fetchDataForTimePeriod(startDate, endDate, "tháng");
        break;
      case "4":
        startDate = startOfYear(subYears(endDate, 3));
        fetchDataForTimePeriod(startDate, endDate, "năm");
        break;
    }
  }, [valueOption]);

  const handleChangeOption = (value) => {
    setValueOption(value);
    switch (value) {
      case "1":
        setPeriodOption("ngày");
        break;
      case "2":
        setPeriodOption("tuần");
        break;
      case "3":
        setPeriodOption("tháng");
        break;
      case "4":
        setPeriodOption("năm");
        break;
      default:
        break;
    }
  };

  return (
    <div className="statistic-container pt-5">
      <div className="container mt-2">
        <div className="filer d-flex align-items-center gap-2">
          <FilterIcon />
          <div className="lg-2">
            <select
              className="form-select w-2"
              onChange={(e) => handleChangeOption(e.target.value)}
            >
              <option value={1}>Ngày</option>
              <option value={2}>Tuần</option>
              <option value={3}>Tháng</option>
              <option value={4}>Năm</option>
            </select>
          </div>
        </div>

        <div className="cell-statistics mt-2">
          <div className="row">
            <div className="col-lg-4 col-sm-6 ">
              <div className="card-box bg-total">
                <div className="inner">
                  <h3>{totalFruits}</h3>
                  <p>
                    <b>Tổng</b> số quả
                  </p>
                </div>
                <div className="icon">
                  <FruitIcon className="icon-i" />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 ">
              <div className="card-box bg-ok">
                <div className="inner">
                  <h3>{freshRatio.toFixed(2)}%</h3>
                  <p>
                    Tỉ lệ <b>ĐẠT</b>
                  </p>
                </div>
                <div className="icon">
                  <IncreaseIcon className="icon-i" />
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-sm-6 ">
              <div class="card-box bg-not-ok">
                <div class="inner">
                  <h3>{rottenRatio.toFixed(2)}%</h3>
                  <p>
                    Tỉ lệ <b>KHÔNG ĐẠT</b>
                  </p>
                </div>
                <div class="icon">
                  <DoubleCheckIcon className="icon-i" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-statictis mt-2 mb-2">
          <div className="row">
            <div class="col-lg-8 col-md-8 col-sm-12 offset-md-2">
              <ContainerWrapper className="border-0">
                <span className="title-chart fst-italic ms-4 text-center">
                  Biểu đồ thể hiện số lượng quả Đạt/Không Đạt 4 {periodOption}{" "}
                  gần nhất
                </span>
                <ColumnChart
                  totalFreshFilter={totalFreshFilter}
                  totalRottenFilter={totalRottenFilter}
                  valueOption={valueOption}
                />
              </ContainerWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistic;
