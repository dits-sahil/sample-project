import type { ReactNode } from "react";
import background from "../../assets/login.png"
const UnAuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
    <div
      style={{
      display: "flex",
 backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      width:"100%",
      minHeight: "100vh",
      alignItems:'center',
      }}
    >
      <main style={{ padding: "2rem",  margin: "0 auto", textAlign: "center" }}>
      {children}
      </main>
    </div>
    </>
  );
};
export default UnAuthLayout;
