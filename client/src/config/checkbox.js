export const CancelOptions = {
    PENDING: 0,
    REFUND: 1
};
  
export const CANCEL_STATUS = [
    {
        label: 'Pending',
        value: CancelOptions.PENDING,
    },
    {
        label: 'Refund',
        value: CancelOptions.REFUND
    }
];

export const OrderOptions = {
    PENDING: 0,
    APPROVE: 1,
    REJECT:2
};

export const ORDER_STATUS = [
    {
        label: 'Pending',
        value: OrderOptions.PENDING,
    },
    {
        label: 'Approve',
        value: OrderOptions.APPROVE
    },
    {
        label: 'Reject',
        value: OrderOptions.REJECT
    }
];