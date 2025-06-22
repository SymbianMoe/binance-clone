import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";


const walletInfo = {
  name: "marcelino.110394",
  address: "0x1234567890abcdef1234567890abcdef12345678",
  coins: [
    {
      name: "Bitcoin",
      short: "BTC",
      amount: 227.542,
      usd: 23317698.26,
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



export default function Home() {
  const { isReady, reload, pathname, push } = useRouter();
  const totalBalance = walletInfo.coins.reduce((acc, coin) => {
    return acc + coin.usd;
  }, 0);



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

      
      </div>
    </>
  );
}
