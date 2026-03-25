// Coupon configuration and validation logic

export interface Coupon {
  code: string;
  name: string;
  discount: number; // percentage
  minAmount: number;
  validUntilDay: number; // day of month
  description: string;
}

export const COUPONS: Record<string, Coupon> = {
  "VMG-SOM": {
    code: "VMG-SOM",
    name: "EARLY BIRD",
    discount: 0.05, // 5%
    minAmount: 5000000, // 5 triệu
    validUntilDay: 20, // ngày 20 hàng tháng
    description: "Giảm ngay 5% cho khóa học từ 5 triệu",
  },
  "EARLYBIRD": {
    code: "EARLYBIRD",
    name: "EARLY BIRD",
    discount: 0.05,
    minAmount: 5000000,
    validUntilDay: 20,
    description: "Giảm ngay 5% cho khóa học từ 5 triệu",
  },
};

export interface CouponValidationResult {
  valid: boolean;
  message: string;
  discount?: number;
  coupon?: Coupon;
}

export function validateCoupon(
  code: string,
  orderTotal: number
): CouponValidationResult {
  const couponCode = code.trim().toUpperCase();
  const coupon = COUPONS[couponCode];

  // Check if coupon exists
  if (!coupon) {
    return {
      valid: false,
      message: "Mã giảm giá không tồn tại",
    };
  }

  // Check minimum order amount
  if (orderTotal < coupon.minAmount) {
    return {
      valid: false,
      message: `Đơn hàng phải từ ₫${coupon.minAmount.toLocaleString()} để áp dụng mã này`,
    };
  }

  // Check if within valid date range (before day 20 of month)
  const today = new Date();
  const currentDay = today.getDate();

  if (currentDay >= coupon.validUntilDay) {
    return {
      valid: false,
      message: `Mã chỉ áp dụng khi thanh toán trước ngày ${coupon.validUntilDay} hàng tháng`,
    };
  }

  // All validations passed
  const discountAmount = orderTotal * coupon.discount;
  return {
    valid: true,
    message: `Áp dụng thành công! Giảm ₫${discountAmount.toLocaleString()}`,
    discount: coupon.discount,
    coupon: coupon,
  };
}

export function getCouponDaysRemaining(): number {
  const today = new Date();
  const currentDay = today.getDate();
  const validUntilDay = 20;

  if (currentDay >= validUntilDay) {
    // Calculate days to next month's day 20
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, validUntilDay);
    const diffTime = nextMonth.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } else {
    // Days remaining in current month
    return validUntilDay - currentDay;
  }
}

export function isCouponValid(): boolean {
  const today = new Date();
  const currentDay = today.getDate();
  return currentDay < 20;
}
