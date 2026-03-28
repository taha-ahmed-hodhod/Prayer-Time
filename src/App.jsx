import { useEffect, useState } from "react";
import Prayer from "./components/Prayer";

function App() {
  const [timePrayer, setTimePrayer] = useState({})
  const [dateHijri, setDateHijiri] = useState("")
  const [cityName, setCityName] = useState("Cairo")

  const governorates = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الجيزة", value: "Giza" },
    { name: "الإسكندرية", value: "Alexandria" },
    { name: "الدقهلية", value: "Dakahlia" },
    { name: "البحر الأحمر", value: "Red_sea" },
    { name: "البحيرة", value: "Beheira" },
    { name: "الفيوم", value: "Fayoum" },
    { name: "الغربية", value: "Gharbia" },
    { name: "الإسماعيلية", value: "Ismailia" },
    { name: "المنوفية", value: "Menofia" },
    { name: "المنيا", value: "Minya" },
    { name: "القليوبية", value: "Qalyubia" },
    { name: "الوادي الجديد", value: "New_valley" },
    { name: "السويس", value: "Suez" },
    { name: "أسوان", value: "Aswan" },
    { name: "أسيوط", value: "Assiut" },
    { name: "بني سويف", value: "Beni_suef" },
    { name: "بورسعيد", value: "Port_said" },
    { name: "دمياط", value: "Damietta" },
    { name: "جنوب سيناء", value: "South_sinai" },
    { name: "شمال سيناء", value: "North_sinai" },
    { name: "سوهاج", value: "Sohag" },
    { name: "قنا", value: "Qena" },
    { name: "كفر الشيخ", value: "Kafr_el_sheikh" },
    { name: "مطروح", value: "Matrouh" },
    { name: "الأقصر", value: "Luxor" },
    { name: "الشرقية", value: "Sharqia" },
  ];


  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  const dateToday = `${day}-${month}-${year}`;

  useEffect(() => {
    const prayerTime = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/${dateToday}?city=${cityName}&country=Egypt`
        );
        const time = await response.json();
              console.log("Full Response:", time); // ← حطها
      console.log("City:", cityName);  

        const time_obj = time.data.timings
        setTimePrayer(time_obj)
        setDateHijiri(time.data.date.hijri.date)
      } catch (err) {
        console.log("Error for giving Data", err);
      }
    };
    prayerTime();
  }, [cityName]);

  const formateTimes = (time) => {
    if(!time) {
      return"00:00"
    }

    let [hours, minutes] = time.split(":").map(Number);
    const perd = hours >= 12 ? "PM" : "AM" ;
    hours = hours % 12 || 12;
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : `${minutes}`}  ${perd}`

  }
  return (
    <section>
      <div className="container">
        <div className="top_sec">
          <div className="city">
            <h3>المدينة</h3>
            <select name="" id="" onChange={(e) => setCityName(e.target.value)}>
              {governorates.map((city, index) => {
                return (
                  <option value={city.value} key={index}>
                    {city.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateToday}  ميلادي</h4>
            <h4>{dateHijri}  هجري</h4>
          </div>
        </div>

        <Prayer name={"الفجر"} time={formateTimes(timePrayer.Fajr)} />
        <Prayer name={"الشروق"} time={formateTimes(timePrayer.Sunrise)} />
        <Prayer name={"الظهر"} time={formateTimes(timePrayer.Dhuhr)} />
        <Prayer name={"العصر"} time={formateTimes(timePrayer.Asr)} />
        <Prayer name={"المغرب"} time={formateTimes(timePrayer.Maghrib)} />
        <Prayer name={"العشاء"} time={formateTimes(timePrayer.Isha)} />
      </div>
    </section>
  );
}

export default App;
