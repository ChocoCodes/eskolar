type ScoreRingProps = {
    score: number;
}

export const ScoreRing = ({ score }: ScoreRingProps) => {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(score / 100, 1);
    const dashOffset = circumference * (1 - progress);

    const getColor = (score: number) => {
        if (score >= 80) return '#fdb913'; // gold/yellow
        if (score >= 60) return '#2563EB'; // blue
        return '#D97706';                  // amber
    }

    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
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
            <p className="relative text-2xl font-bold">{score}</p>
        </div>
    );
}