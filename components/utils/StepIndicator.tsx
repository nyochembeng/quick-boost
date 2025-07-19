interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <p className="text-sm text-gray-500 smartwatch:text-xs">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
