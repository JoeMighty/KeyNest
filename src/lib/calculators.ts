export interface StampDutyResult {
  totalTax: number;
  effectiveRate: number;
  bands: {
    rate: number;
    threshold: string;
    tax: number;
  }[];
}

export function calculateStampDuty(
  price: number,
  buyerType: "first-time" | "mover" | "additional"
): StampDutyResult {
  let tax = 0;
  const bands: { rate: number; threshold: string; tax: number }[] = [];

  // Standard bands
  const standardBands = [
    { threshold: 250000, rate: 0 },
    { threshold: 925000, rate: 0.05 },
    { threshold: 1500000, rate: 0.1 },
    { threshold: Infinity, rate: 0.12 },
  ];

  // Additional property surcharge
  const surcharge = buyerType === "additional" ? 0.03 : 0;

  if (buyerType === "first-time" && price <= 625000) {
    // First-time buyer relief
    const reliefThreshold = 425000;
    
    // Band 1: 0 - 425k (0%)
    bands.push({ rate: 0, threshold: "£0 - £425,000", tax: 0 });

    // Band 2: 425k - 625k (5%)
    if (price > reliefThreshold) {
      const b2Amount = Math.min(price, 625000) - reliefThreshold;
      const b2Tax = b2Amount * 0.05;
      tax += b2Tax;
      bands.push({ rate: 5, threshold: "£425,001 - £625,000", tax: b2Tax });
    }
  } else {
    // Standard calculation
    let previousThreshold = 0;
    for (const band of standardBands) {
      if (price > previousThreshold) {
        const taxableAmount = Math.min(price, band.threshold) - previousThreshold;
        const currentRate = band.rate + surcharge;
        const bandTax = taxableAmount * currentRate;
        tax += bandTax;
        
        bands.push({
          rate: currentRate * 100,
          threshold: `£${previousThreshold.toLocaleString()} - ${band.threshold === Infinity ? "Above" : "£" + band.threshold.toLocaleString()}`,
          tax: bandTax,
        });
      }
      previousThreshold = band.threshold;
    }
  }

  return {
    totalTax: tax,
    effectiveRate: price > 0 ? (tax / price) * 100 : 0,
    bands,
  };
}

export interface TotalCostResult {
  totalFees: number;
  totalCashNeeded: number;
  breakdown: {
    category: string;
    items: {
      name: string;
      amount: number;
      isOptional?: boolean;
    }[];
  }[];
}

export function calculateTotalCost(
  price: number,
  deposit: number,
  stampDuty: number,
  fees: {
    legal: number;
    survey: number;
    mortgage: number;
    removals: number;
    other: number;
  }
): TotalCostResult {
  const totalFees = stampDuty + fees.legal + fees.survey + fees.mortgage + fees.removals + fees.other;
  const totalCashNeeded = deposit + totalFees;

  return {
    totalFees,
    totalCashNeeded,
    breakdown: [
      {
        category: "Property",
        items: [
          { name: "Deposit", amount: deposit },
        ],
      },
      {
        category: "Mandatory Taxes & Fees",
        items: [
          { name: "Stamp Duty", amount: stampDuty },
          { name: "Legal / Conveyancing", amount: fees.legal },
          { name: "Mortgage Fees", amount: fees.mortgage },
        ],
      },
      {
        category: "Moving & Setup",
        items: [
          { name: "Survey", amount: fees.survey },
          { name: "Removals", amount: fees.removals },
          { name: "Other Costs", amount: fees.other },
        ],
      },
    ],
  };
}

export interface MortgageResult {
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
}

export function calculateMortgage(
  principal: number,
  annualRate: number,
  termYears: number
): MortgageResult {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = termYears * 12;
  
  const monthlyPayment = 
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
  const totalRepayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalRepayment - principal;

  return {
    monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
    totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
    totalRepayment: isNaN(totalRepayment) ? 0 : totalRepayment,
  };
}

export interface MonthlyCostResult {
  totalMonthly: number;
  mortgage: number;
  utilities: number;
  taxes: number;
  maintenance: number;
  insurance: number;
  breakdown: {
    name: string;
    amount: number;
    category: string;
  }[];
}

export function calculateMonthlyCost(
  mortgage: number,
  councilTax: number,
  energy: number,
  water: number,
  broadband: number,
  serviceCharge: number,
  insurance: number,
  maintenance: number
): MonthlyCostResult {
  const totalMonthly = mortgage + councilTax + energy + water + broadband + serviceCharge + insurance + maintenance;

  return {
    totalMonthly,
    mortgage,
    utilities: energy + water + broadband,
    taxes: councilTax,
    maintenance: serviceCharge + maintenance,
    insurance,
    breakdown: [
      { name: "Mortgage Repayment", amount: mortgage, category: "Housing" },
      { name: "Council Tax", amount: councilTax, category: "Taxes" },
      { name: "Energy (Gas/Elec)", amount: energy, category: "Utilities" },
      { name: "Water", amount: water, category: "Utilities" },
      { name: "Broadband/TV", amount: broadband, category: "Utilities" },
      { name: "Service Charge", amount: serviceCharge, category: "Housing" },
      { name: "Home Insurance", amount: insurance, category: "Insurance" },
      { name: "Maintenance Fund", amount: maintenance, category: "Housing" },
    ],
  };
}

export interface OfferStrategyResult {
  recommendedOffer: number;
  strategy: string;
  pros: string[];
  cons: string[];
}

export function calculateOfferStrategy(
  askingPrice: number,
  maxPrice: number,
  marketHeat: "cold" | "neutral" | "hot",
  propertyCondition: "perfect" | "good" | "needs-work" | "renovation"
): OfferStrategyResult {
  let multiplier = 1;
  
  // Market Heat adjustment
  if (marketHeat === "cold") multiplier -= 0.05;
  if (marketHeat === "hot") multiplier += 0.02;
  
  // Condition adjustment
  if (propertyCondition === "needs-work") multiplier -= 0.03;
  if (propertyCondition === "renovation") multiplier -= 0.10;
  
  let recommendedOffer = askingPrice * multiplier;
  
  // Cap at max price
  recommendedOffer = Math.min(recommendedOffer, maxPrice);

  let strategy = "";
  let pros: string[] = [];
  let cons: string[] = [];

  if (marketHeat === "hot") {
    strategy = "Aggressive & Fast";
    pros = ["High chance of acceptance", "Stops further viewings"];
    cons = ["Risk of overpaying", "Smaller buffer for repairs"];
  } else if (marketHeat === "cold") {
    strategy = "The Strategic Low-Ball";
    pros = ["Saves significant cash", "Room to negotiate up"];
    cons = ["May offend seller", "Risk of losing to another buyer"];
  } else {
    strategy = "Fair Market Value";
    pros = ["Professional & realistic", "Smooth transaction start"];
    cons = ["Might still be outbid", "Little room for price drops"];
  }

  return {
    recommendedOffer: Math.round(recommendedOffer / 500) * 500, // Round to nearest 500
    strategy,
    pros,
    cons,
  };
}

export interface RentVsBuyResult {
  totalRentCost: number;
  totalBuyCost: number;
  difference: number;
  betterOption: "rent" | "buy";
  yearlyBreakdown: {
    year: number;
    rentTotal: number;
    buyTotal: number;
    equity: number;
  }[];
}

export function calculateRentVsBuy(
  purchasePrice: number,
  deposit: number,
  monthlyRent: number,
  mortgageRate: number,
  appreciationRate: number, // yearly %
  maintenanceYearly: number, // £
  buyingFees: number,
  years: number
): RentVsBuyResult {
  const mortgageAmount = purchasePrice - deposit;
  const monthlyPayment = calculateMortgage(mortgageAmount, mortgageRate, 25).monthlyPayment;
  
  let totalRentCost = 0;
  let totalBuyCost = buyingFees;
  let currentEquity = deposit;
  let currentPropertyVal = purchasePrice;
  
  const yearlyBreakdown: RentVsBuyResult["yearlyBreakdown"] = [];

  for (let y = 1; y <= years; y++) {
    // Rent side
    totalRentCost += (monthlyRent * 12);
    
    // Buy side
    const yearlyInterest = mortgageAmount * (mortgageRate / 100); // simplified
    const yearlyPrincipal = (monthlyPayment * 12) - yearlyInterest;
    
    totalBuyCost += yearlyInterest + maintenanceYearly;
    currentEquity += yearlyPrincipal;
    currentPropertyVal *= (1 + appreciationRate / 100);
    
    // Add appreciation as a "negative cost" in final result, but track costs separately
    yearlyBreakdown.push({
      year: y,
      rentTotal: totalRentCost,
      buyTotal: totalBuyCost,
      equity: currentEquity + (currentPropertyVal - purchasePrice),
    });
  }

  // Adjust buy cost for appreciation
  const totalBuyCostAdjusted = totalBuyCost - (currentPropertyVal - purchasePrice);

  return {
    totalRentCost,
    totalBuyCost: totalBuyCostAdjusted,
    difference: Math.abs(totalRentCost - totalBuyCostAdjusted),
    betterOption: totalBuyCostAdjusted < totalRentCost ? "buy" : "rent",
    yearlyBreakdown,
  };
}

export interface OverpaymentResult {
  monthlyPayment: number;
  totalInterestStandard: number;
  totalInterestWithOverpayment: number;
  savings: number;
  yearsSaved: number;
  monthsSaved: number;
  newTermMonths: number;
  amortization: {
    month: number;
    balance: number;
    interest: number;
    principal: number;
    overpayment: number;
  }[];
}

export function calculateOverpayment(
  balance: number,
  annualRate: number,
  remainingTermYears: number,
  monthlyOverpayment: number,
  oneOffLumpSum: number = 0
): OverpaymentResult {
  const monthlyRate = annualRate / 100 / 12;
  const standardMonths = remainingTermYears * 12;
  
  // Standard Mortgage (No Overpayments)
  const standardPayment = 
    (balance * monthlyRate * Math.pow(1 + monthlyRate, standardMonths)) /
    (Math.pow(1 + monthlyRate, standardMonths) - 1);
  
  const totalInterestStandard = (standardPayment * standardMonths) - balance;

  // Overpayment Calculation
  let currentBalance = balance - oneOffLumpSum;
  let totalInterestWithOverpayment = 0;
  let month = 0;
  const amortization = [];

  while (currentBalance > 0 && month < standardMonths) {
    month++;
    const interest = currentBalance * monthlyRate;
    const principal = Math.min(currentBalance, (standardPayment - interest) + monthlyOverpayment);
    
    totalInterestWithOverpayment += interest;
    currentBalance -= principal;

    if (month % 12 === 0 || month === 1) {
      amortization.push({
        month,
        balance: Math.max(0, currentBalance),
        interest,
        principal,
        overpayment: monthlyOverpayment
      });
    }

    if (currentBalance <= 0) break;
  }

  const monthsSaved = standardMonths - month;
  
  return {
    monthlyPayment: standardPayment,
    totalInterestStandard,
    totalInterestWithOverpayment,
    savings: totalInterestStandard - totalInterestWithOverpayment,
    yearsSaved: Math.floor(monthsSaved / 12),
    monthsSaved: monthsSaved % 12,
    newTermMonths: month,
    amortization
  };
}

export interface SavingsTimelineResult {
  monthsToTarget: number;
  totalSaved: number;
  totalInterest: number;
  timeline: {
    month: number;
    balance: number;
    contribution: number;
    interest: number;
  }[];
}

export function calculateSavingsTimeline(
  target: number,
  current: number,
  monthlyContribution: number,
  annualRate: number
): SavingsTimelineResult {
  const monthlyRate = annualRate / 100 / 12;
  let balance = current;
  let totalInterest = 0;
  let month = 0;
  const timeline = [];

  while (balance < target && month < 600) { // Cap at 50 years
    month++;
    const interest = balance * monthlyRate;
    totalInterest += interest;
    balance += monthlyContribution + interest;

    if (month % 6 === 0 || month === 1) {
      timeline.push({
        month,
        balance,
        contribution: monthlyContribution,
        interest
      });
    }
  }

  return {
    monthsToTarget: month,
    totalSaved: balance,
    totalInterest,
    timeline
  };
}
