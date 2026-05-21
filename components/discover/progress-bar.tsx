type ProgressBarProps = {
    label: string;
    weight?: string;
    value: number;
    max: number;
    color?: string;
}

export const ProgressBar = ({ label, weight, value, max, color = 'bg-blue-500' }: ProgressBarProps) => {
    const percentage = Math.min((value / max) * 100, 100);
    
    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between text-sm">
                <span className="font-semibold text-shadow-muted-foreground">
                    {label} {weight && <span className="text-xs text-muted-foreground/90">({weight})</span>}
                </span>
                <span className="font-medium">{value} / {max}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
                <div 
                    className={`h-2 rounded-full ${color} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}