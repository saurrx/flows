export function SolanaIcon({ className }: { className?: string }) {
    return (
        <svg
            aria-label="Solana logo"
            className={className}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.773 6.963h17.917c.29 0 .56-.134.743-.37l3.414-4.385c.34-.436.03-.998-.523-.998H8.406c-.29 0-.56.133-.742.368L4.25 5.963c-.34.436-.03.998.523.998z"
                fill="url(#solana_paint0_linear)"
            />
            <path
                d="M27.227 12.63H9.31c-.29 0-.56.134-.743.37L5.153 17.384c-.34.436-.03.999.523.999h17.917c.29 0 .56-.134.742-.369l3.414-4.385c.34-.436.03-.998-.523-.998z"
                fill="url(#solana_paint1_linear)"
            />
            <path
                d="M4.773 23.963h17.917c.29 0 .56-.134.743-.37l3.414-4.385c.34-.436.03-.998-.523-.998H8.406c-.29 0-.56.133-.742.368l-3.414 4.385c-.34.436-.03.998.523.998z"
                fill="url(#solana_paint2_linear)"
            />
            <defs>
                <linearGradient
                    id="solana_paint0_linear"
                    x1="26.85"
                    y1="1.21"
                    x2="4.25"
                    y2="6.96"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#9945FF" />
                    <stop offset="1" stopColor="#14F195" />
                </linearGradient>
                <linearGradient
                    id="solana_paint1_linear"
                    x1="5.15"
                    y1="18.38"
                    x2="27.75"
                    y2="12.63"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#9945FF" />
                    <stop offset="1" stopColor="#14F195" />
                </linearGradient>
                <linearGradient
                    id="solana_paint2_linear"
                    x1="26.85"
                    y1="18.21"
                    x2="4.25"
                    y2="23.96"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#9945FF" />
                    <stop offset="1" stopColor="#14F195" />
                </linearGradient>
            </defs>
        </svg>
    );
}
