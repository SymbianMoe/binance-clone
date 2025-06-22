import "../styles/globals.css";
import type { AppProps } from "next/app";
import { IoWalletSharp, IoWallet } from "react-icons/io5";
import { RiFileList2Line, RiFileList2Fill } from "react-icons/ri";
import { LuArrowUpDown } from "react-icons/lu";
import { CiGlobe } from "react-icons/ci";
import { FaGlobe } from "react-icons/fa";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { NavBarItem } from "components/NavBarItem";
import { useRouter } from "next/router";
import { usePullToRefresh } from "use-pull-to-refresh";
import { TailSpin } from "react-loader-spinner";

const MAXIMUM_PULL_LENGTH = 240;
const REFRESH_THRESHOLD = 180;
export default function App({ Component, pageProps }: AppProps) {
  const { isReady, reload, pathname, push } = useRouter();
  const { isRefreshing, pullPosition } = usePullToRefresh({
    // you can choose what behavior for `onRefresh`, could be calling an API to load more data, or refresh whole page.
    onRefresh: reload,
    maximumPullLength: MAXIMUM_PULL_LENGTH,
    refreshThreshold: REFRESH_THRESHOLD,
    isDisabled: !isReady,
  });
  return (
    <>
      <div
        style={{
          top: (isRefreshing ? REFRESH_THRESHOLD : pullPosition) / 3,
          opacity: isRefreshing || pullPosition > 0 ? 1 : 0,
        }}
        className="my-spinner-container"
      >
        <div
          className={`h-full w-full ${isRefreshing ? "animate-spin" : ""}`}
          style={
            !isRefreshing ? { transform: `rotate(${pullPosition}deg)` } : {}
          }
        >
          <TailSpin
            visible={true}
            height="32"
            width="32"
            color="#0e62ff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>

      <Component {...pageProps} />

      <footer>
        <div className="footer-nav">
          <NavBarItem
            icon={
              /* @ts-expect-error */
              <AiOutlineHome />
            }
            activeIcon={
              /* @ts-expect-error */
              <AiFillHome />
            }
            onGo={() => {
             // push("/home");
            }}
            isActive={pathname === "/home"}
          />
          <NavBarItem
            icon={
              /* @ts-expect-error */
              <CiGlobe />
            }
            activeIcon={
              /* @ts-expect-error */
              <FaGlobe />
            }
            onGo={() => {
             // push("/explore");
            }}
            isActive={pathname === "/explore"}
          />
          <NavBarItem
            icon={
              /* @ts-expect-error */
              <LuArrowUpDown />
            }
            activeIcon={
              /* @ts-expect-error */
              <LuArrowUpDown />
            }
            onGo={() => {
             // push("/send");
            }}
            isActive={pathname === "/send"}
          />
          <NavBarItem
            icon={
              /* @ts-expect-error */
              <RiFileList2Line />
            }
            activeIcon={
              /* @ts-expect-error */
              <RiFileList2Fill />
            }
            onGo={() => {
             // push("/transactions");
            }}
            isActive={pathname === "/transactions"}
          />
          <NavBarItem
            icon={
              /* @ts-expect-error */
              <IoWallet />
            }
            activeIcon={
              /* @ts-expect-error */
              <IoWalletSharp />
            }
            onGo={() => {
              push("/");
            }}
            isActive={pathname === "/"}
          />
        </div>
      </footer>
    </>
  );
}
