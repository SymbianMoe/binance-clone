import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import { usePullToRefresh } from "use-pull-to-refresh";
import { TailSpin } from "react-loader-spinner";
import { IoWalletSharp, IoWallet } from "react-icons/io5";
import { RiFileList2Line } from "react-icons/ri";
import { LuArrowUpDown } from "react-icons/lu";
import { CiGlobe } from "react-icons/ci";
import { FaGlobe } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";

const MAXIMUM_PULL_LENGTH = 240;
const REFRESH_THRESHOLD = 180;
const walletInfo = {
  name: "marcelino.110394",
  address: "0x1234567890abcdef1234567890abcdef12345678",
  coins: [
    {
      name: "Bitcoin",
      short: "BTC",
      amount: 218.742,
      usd: 22906224.76,
      img: "/btc.png",
    },
    {
      name: "Ethereum",
      short: "ETH",
      amount: 102.88741239,
      usd: 259945.87,
      img: "/eth.png",
    },
    {
      name: "USDC",
      short: "USDC",
      amount: 10004200.54889,
      usd: 10004200.55,
      img: "/usdc.png",
    },
    {
      name: "Solana",
      short: "SOL",
      amount: 100.4432564,
      usd: 14765.68,
      img: "/solana.png",
    },
    {
      name: "Litecoin",
      short: "LTC",
      amount: 50.98,
      usd: 4346.71,
      img: "/ltc.png",
    },
    {
      name: "MATIC",
      short: "MATIC",
      amount: 12.44,
      usd: 8.5,
      img: "/matic.png",
    },
    {
      name: "BnB",
      short: "BNB",
      amount: 5.67,
      usd: 1234.56,
      img: "/bnb.webp",
    },
  ],
};

interface NavBarItemProps {
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  isActive: boolean;
  onGo?: () => void;
}
const NavBarItem = ({ icon, activeIcon, isActive, onGo }: NavBarItemProps) => {
  return (
    <div className={`nav-item ${isActive ? "active-2" : ""}`} onClick={onGo}>
      <div className="nav-icon">{isActive ? activeIcon : icon}</div>
    </div>
  );
};

export default function Home() {
  const { isReady, reload, pathname, push } = useRouter();
  const totalBalance = walletInfo.coins.reduce((acc, coin) => {
    return acc + coin.usd;
  }, 0);

  const { isRefreshing, pullPosition } = usePullToRefresh({
    // you can choose what behavior for `onRefresh`, could be calling an API to load more data, or refresh whole page.
    onRefresh: reload,
    maximumPullLength: MAXIMUM_PULL_LENGTH,
    refreshThreshold: REFRESH_THRESHOLD,
    isDisabled: !isReady,
  });

  const getCurrentRoute = () => {
    return pathname;
  };

  return (
    <>
      <Head>
        <title>Coinbase</title>
        <meta name="description" content="Coinbase" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
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
        <header>
          <div className="header-content">
            <div className="header-row">
              <div className="logo">
                <div className="logo-image-container">
                  <Image
                    src="/Coinbase_App.webp"
                    alt="Coinbase Logo"
                    width={25}
                    height={25}
                    className="logo-image"
                  />
                </div>
                <div className="logo-text">
                  <span>
                    coinbase
                    <span
                      style={{
                        color: "gray",
                      }}
                    >
                      .{walletInfo.name}
                    </span>
                  </span>
                </div>
              </div>
              <div className="header-btns"></div>
            </div>
            <div className="balance">
              <span>
                {totalBalance.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
          </div>
          <div className="btn-grp">
            <button className="nav-button active-1">Buy</button>
            <button className="nav-button">Swap</button>
          </div>
        </header>

        <main>
          <section className="crypto-section">
            <div className="crypto-tabs">
              <div className="tab active">Crypto</div>
              <div className="tab">NFTs</div>
              <div className="tab">DeFi</div>
            </div>

            <div className="crypto-list">
              {walletInfo.coins.map((coin, index) => (
                <div className="crypto-item" key={index}>
                  <div className="crypto-details">
                    <div className="crypto-icon">
                      <Image
                        src={coin.img}
                        alt={`${coin.name} icon`}
                        width={30}
                        height={30}
                      />
                    </div>
                    <div className="crypto-info">
                      <div className="crypto-name">{coin.name}</div>
                    </div>
                  </div>

                  <div className="crypto-stats">
                    <div className="crypto-usd">
                      {coin.usd.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                    <div className="crypto-amount">
                      {coin.amount.toLocaleString("en-US", {
                        maximumFractionDigits: 8,
                      })}
                      {" " + coin.short}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer>
          <div className="footer-nav">
            <NavBarItem
              icon={
                /* @ts-expect-error */
                <AiOutlineHome />
              }
              activeIcon={
                /* @ts-expect-error */
                <AiOutlineHome />
              }
              onGo={() => {
                push("/home");
              }}
              isActive={getCurrentRoute() === "/home"}
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
                push("/explore");
              }}
              isActive={getCurrentRoute() === "/explore"}
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
                push("/send");
              }}
              isActive={getCurrentRoute() === "/send"}
            />
            <NavBarItem
              icon={
                /* @ts-expect-error */
                <RiFileList2Line />
              }
              activeIcon={
                /* @ts-expect-error */
                <RiFileList2Line />
              }
              onGo={() => {
                push("/transactions");
              }}
              isActive={getCurrentRoute() === "/transactions"}
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
              isActive={getCurrentRoute() === "/"}
            />
          </div>
        </footer>
      </div>
    </>
  );
}
