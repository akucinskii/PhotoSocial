import { useEffect, useState } from "react";

function App() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => {
    setOffsetY(window.scrollY);
    console.log(offsetY, window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="w-[300vh]">
      <img
        style={{
          transform: `translateY(0,{${offsetY} * ${1} / (${2} - 1)}px)`,
        }}
        src="layer2.png"
        alt=""
      />
      <img
        style={{
          transform: `translateY(0,{${offsetY} * ${2} / (${2} - 1)}px)`,
        }}
        src="layer3.png"
        alt=""
      />

      <img src="layer2.png" alt="" />
      <div className="text">
        <span style={{ opacity: `{1 - Math.max(0, ${offsetY} / 40)` }}>
          scroll down
        </span>

        <div className="foreground">You have scrolled {offsetY} pixels</div>
      </div>
    </div>
  );
}

export default App;
