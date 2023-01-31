export default interface App {
  externalId: string;
  name: string;
  logo: string;
  productWebsiteURL: string;
  directCategory: string;
  categoryGroups: string[];
  categories: string[];
  description: string;
  detectionSources: string[];
  detectionDate: string;
  detectionDateTimestamp: number;
  usedAlternatives: Alternative[];
  totalUsedAlternatives: number;
  usersCount: number;
  billedExpenses: any;
  hasBilledExpenses: boolean;
  monthsWithBilledExpenses: any[];
  paidExpenses: any;
  monthsWithPaidExpenses: any[];
  currentRollingYearExpenses: number | null;
  previousRollingYearExpenses: number | null;
  expensesIncrease: number | null;
  mainCurrency: string;
  mainCurrencySymbol: string;
  grantedPermissions: string[];
  objectID: string;
}
export interface Alternative {
  id: string;
  externalId: string;
  name: string;
  logo: string;
  usersCount: number;
  currentRollingYearExpenses: number;
}
