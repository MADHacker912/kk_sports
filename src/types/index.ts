export type ProductCategory = 
  | 'all'
  | 'cricket'
  | 'football'
  | 'badminton'
  | 'fitness'
  | 'indoor'
  | 'toys'
  | 'accessories';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  priceDisplay?: string;
  shortDesc: string;
  fullDesc: string;
  specs: ProductSpec[];
  badge?: string;
  image: string;
  hoverImage?: string;
  features: string[];
  inStock: boolean;
  isFlagship360?: boolean;
}

export interface CategoryInfo {
  id: ProductCategory;
  title: string;
  tag: string;
  itemCount: string;
  description: string;
  image: string;
  featuredProductsCount: number;
}
