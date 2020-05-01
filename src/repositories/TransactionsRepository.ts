import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransacction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const { income, outcome } = this.transactions.reduce(
        (acumulat: Balance, transaction: Transaction) => {
            switch (transaction.type) {
            case 'income':
                acumulat.income += transaction.value;
                break;
            case 'outcome':
                acumulat.outcome += transaction.value;
                break;
            default:
                break;
            }

            return acumulat;
        },
        {
        income: 0,
        outcome: 0,
        total: 0,
        },
    );
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransacction): Transaction {
    const trans = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(trans);

    return trans;
  }
}

export default TransactionsRepository;
