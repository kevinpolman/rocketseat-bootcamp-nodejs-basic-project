import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

export interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: CreateTransactionDTO): Transaction {
    const getAllTransactions = this.transactionsRepository.getBalance();

    if (type === 'outcome') {
      if (getAllTransactions.outcome + value > getAllTransactions.income) {
        throw Error('Outcome is higher than income, operation denied.');
      }
    }

    const createNewTransaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    return createNewTransaction;
  }
}

export default CreateTransactionService;
