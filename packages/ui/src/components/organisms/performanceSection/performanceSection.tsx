import React from "react";
import { PerformanceCard, PerformanceCardProps } from "../../molecules/performanceCard/performanceCard";

interface PerformanceSectionProps {
    stats: PerformanceCardProps[];
}

export const PerformanceSection = ({stats,}: PerformanceSectionProps) => { 
    return (
        <div className="grid grid-cols-2">
           {stats.map((stat, index) => (
               // eslint-disable-next-line react/no-array-index-key
               <PerformanceCard key={index} {...stat} />
              ))}
        </div>
    )
}