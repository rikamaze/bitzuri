import { memo, useState, useEffect } from "react"
import { OptimizedImage } from "@/components/ui/optimized-image"

interface AssetIconProps {
  symbol: string
  color?: string
  size?: "sm" | "md" | "lg"
  className?: string
  iconUrl?: string
}

const sizeClasses = {
  sm: "w-6 h-6 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
}

const cryptoNameToSymbolMap: { [key: string]: string } = {
    BTC: "bitcoin",
    ETH: "ethereum",
    USDT: "tether",
    BNB: "bnb",
    SOL: "solana",
    XRP: "xrp",
    DOGE: "dogecoin",
    ADA: "cardano",
    AVAX: "avalanche",
    SHIB: "shiba-inu",
    DOT: "polkadot",
    LINK: "chainlink",
    TRX: "tron",
    MATIC: "polygon",
    LTC: "litecoin",
    ICP: "internet-computer",
    BCH: "bitcoin-cash",
    ATOM: "cosmos",
    UNI: "uniswap",
    XLM: "stellar",
    OKB: "okb",
    NEAR: "near-protocol",
    ETC: "ethereum-classic",
    FIL: "filecoin",
    HBAR: "hedera",
    APT: "aptos",
    CRO: "cronos",
    VET: "vechain",
    LDO: "lido-dao",
    IMX: "immutable-x",
    GRT: "the-graph",
    MKR: "maker",
    AAVE: "aave",
    QNT: "quant",
    ZEC: "zcash",
    XTZ: "tezos",
    MANA: "decentraland",
    SAND: "the-sandbox",
    EGLD: "elrond",
    AXS: "axie-infinity",
    THETA: "theta-network",
    FTM: "fantom",
    KCS: "kucoin-token",
    RUNE: "thorchain",
    NEO: "neo",
    WAVES: "waves",
    CHZ: "chiliz",
};

const localLogoMap: { [key: string]: string } = {
  BTC: "/logos/bitcoin-btc-logo.svg",
  ETH: "/logos/ethereum-eth-logo.svg",
  USDT: "/logos/tether-usdt-logo.svg",
  BNB: "/logos/bnb-bnb-logo.svg",
  SOL: "/logos/solana-sol-logo.svg",
  XRP: "/logos/xrp-xrp-logo.svg",
  ADA: "/logos/cardano-ada-logo.svg",
  LTC: "/logos/litecoin-ltc-logo.svg",
  UNI: "/logos/uniswap-uni-logo.svg",
  PEPE: "/logos/pepe-pepe-logo.svg",
};

export const AssetIcon = memo(function AssetIcon({ 
  symbol, 
  color, 
  size = "md", 
  className = "",
  iconUrl
}: AssetIconProps) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(iconUrl);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (iconUrl) {
      setImgSrc(iconUrl);
      setHasError(false);
      return;
    }

    const upperSymbol = symbol.toUpperCase();
    if (localLogoMap[upperSymbol]) {
      setImgSrc(localLogoMap[upperSymbol]);
    } else {
      const name = cryptoNameToSymbolMap[upperSymbol];
      if (name) {
        setImgSrc(`https://cryptologos.cc/logos/${name}-${upperSymbol.toLowerCase()}-logo.svg`);
      } else {
        setImgSrc(undefined);
      }
    }
    setHasError(false);
  }, [symbol, iconUrl]);

  const bgColor = color ? `${color}20` : "rgba(147, 51, 234, 0.2)"
  const sizePx = size === "sm" ? 24 : size === "md" ? 40 : 48;

  const handleError = () => {
    if (imgSrc && imgSrc.endsWith('.svg')) {
      // Fallback to PNG
      setImgSrc(imgSrc.replace('.svg', '.png'));
    } else {
      setHasError(true);
    }
  };

  if (imgSrc && !hasError) {
    return (
      <div className={`${sizeClasses[size]} ${className} overflow-hidden rounded-full`}>
        <OptimizedImage
          src={imgSrc}
          alt={`${symbol} icon`}
          width={sizePx}
          height={sizePx}
          className="w-full h-full"
          onError={handleError}
          unoptimized={true}
        />
      </div>
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: bgColor }}
      aria-label={`${symbol} icon`}
    >
      {symbol[0].toUpperCase()}
    </div>
  )
})
