
export interface NextValidatorType {
    address: string;
    name: string;
    publicKey: string;
    nextAllocatedTime: number;
    status: string;
  }


//SEARCH TYPES
export interface SearchResultsType {
    validators?: SearchValidator[];
    blocks?: SearchBlock[];
    transactions?: SearchTransaction[];
  }
  
  interface SearchValidator {
    name: string;
    address: string;
    publicKey: string;
    rank: number;
  }
  
  interface SearchBlock {
    height: number;
    id: string;
  }
  
  interface SearchTransaction {
    id: string;
    sender: string;
  }
  