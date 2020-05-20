import Transaction from '../models/Transaction';
import { CreateTransactionDTO } from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = {
      income: this.transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((sum, transaction) => {
          return sum + transaction.value;
        }, 0),

      outcome: this.transactions
        .filter(transaction => transaction.type === 'outcome')
        .reduce((sum, transaction) => {
          return sum + transaction.value;
        }, 0),

      total:
        this.transactions
          .filter(transaction => transaction.type === 'income')
          .reduce((sum, transaction) => {
            return sum + transaction.value;
          }, 0) -
        this.transactions
          .filter(transaction => transaction.type === 'outcome')
          .reduce((sum, transaction) => {
            return sum + transaction.value;
          }, 0),
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
