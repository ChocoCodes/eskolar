type ScoreRingProps = {
    score: number;
}

export const ScoreRing = ({ score }: ScoreRingProps) => {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(score / 100, 1);
    const dashOffset = circumference * (1 - progress);

    const getColor = (score: number) => {
        if (score >= 90.0) return '#fdb913'; // gold/yellow - strong
        if (score >= 75.0) return '#2563EB'; // blue - good
        if (score >= 60.0) return '#10B981' // green - fair
        return '#EF4444';                  // amber - low
    }

    return (
        <div className="relative w-26 h-26 flex items-center justify-center">
            <svg 
                className="absolute inset-0 w-full h-full -rotate-90" 
                viewBox="0 0 144 144"
            >
                <circle
                    cx="72" cy="72" r={radius}
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="10"
                />
                <circle
                    cx="72" cy="72" r={radius}
                    fill="none"
                    stroke={getColor(score)}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    className="transition-all duration-700"
                />
            </svg>
            <p className="relative text-xl font-bold">{score}</p>
        </div>
    );
}