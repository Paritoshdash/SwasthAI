import { BmiCalculator } from "@/components/calculators/bmi-calculator";
import { DueDateCalculator } from "@/components/calculators/due-date-calculator";
import { PeriodOvulationCalculator } from "@/components/calculators/period-ovulation-calculator";

export default function ToolsPage() {
  return (
    <main className="container mx-auto py-12 px-4 space-y-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Health Tools</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          A collection of simple calculators to help you track your health and wellness journey.
        </p>
      </div>
      
      {/* Add an outer div to wrap the grid */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ✨ Add id attributes to each calculator component */}
        <div id="bmi">
          <BmiCalculator />
        </div>
        <div id="pregnancy">
          <DueDateCalculator />
        </div>
        <div id="period">
          <PeriodOvulationCalculator />
        </div>
      </div>
    </main>
  );
}