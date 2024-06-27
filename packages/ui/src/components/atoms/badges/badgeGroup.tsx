import { Badge } from "./badge";
import { ColorType } from "../../../types/types";
import { cls } from "../../../utils/functions";

interface BadgeGroupProps {
    badges: { colorVariant?: ColorType; label: string; }[]; 
    className?: string;
}

export const BadgeGroup = ({ badges, className, }: BadgeGroupProps) => {
    return (
        <div className={cls(['flex gap-2 flex-wrap', className])}>
            {badges.slice(0, 3).map((badge) => (
                <Badge colorVariant={badge.colorVariant} key={badge.label} label={badge.label} />
            ))}
        </div>
    );
};
