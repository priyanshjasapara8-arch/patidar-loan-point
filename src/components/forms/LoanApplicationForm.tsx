import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { LOAN_TYPES, MIN_LOAN_AMOUNT, MAX_LOAN_AMOUNT, MIN_TENURE, MAX_TENURE } from '@constants/index'
import { useCreateLoan } from '@services/loanService'
import { useAuth } from '@hooks/useAuth'
import toast from 'react-hot-toast'
import { Loader, DollarSign, Calendar } from 'lucide-react'

const loanSchema = z.object({
  loanType: z.string().min(1, 'Please select a loan type'),
  loanAmount: z.number().min(MIN_LOAN_AMOUNT).max(MAX_LOAN_AMOUNT),
  tenure: z.number().min(MIN_TENURE).max(MAX_TENURE),
  purpose: z.string().optional(),
  collateralType: z.string().optional(),
  collateralValue: z.number().optional(),
})

type LoanApplicationFormData = z.infer<typeof loanSchema>

interface LoanApplicationFormProps {
  onSuccess?: () => void
}

export const LoanApplicationForm: React.FC<LoanApplicationFormProps> = ({
  onSuccess,
}) => {
  const { userData } = useAuth()
  const createLoan = useCreateLoan()
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<LoanApplicationFormData>({
    resolver: zodResolver(loanSchema),
  })

  const loanAmount = watch('loanAmount')
  const tenure = watch('tenure')
  const loanType = watch('loanType')

  const calculateEMI = () => {
    if (!loanAmount || !tenure) return 0
    const monthlyRate = 5.5 / 12 / 100
    if (monthlyRate === 0) return loanAmount / tenure
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1)
    return Math.round(emi * 100) / 100
  }

  const onSubmit = async (data: LoanApplicationFormData) => {
    if (!userData?.id) {
      toast.error('User not found')
      return
    }

    try {
      await createLoan.mutateAsync({
        customerId: userData.id,
        loanData: data,
      })
      toast.success('Loan application submitted successfully!')
      onSuccess?.()
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit application')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="card-premium">
        <h3 className="text-lg font-semibold mb-6">Loan Details</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="loanType">Loan Type</Label>
            <Controller
              name="loanType"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger id="loanType" className="mt-2">
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(LOAN_TYPES).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {key.charAt(0) + key.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.loanType && (
              <p className="text-red-500 text-sm mt-1">{errors.loanType.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
            <div className="relative mt-2">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="loanAmount"
                type="number"
                placeholder="Enter amount"
                className="pl-10"
                {...register('loanAmount', { valueAsNumber: true })}
              />
            </div>
            {errors.loanAmount && (
              <p className="text-red-500 text-sm mt-1">{errors.loanAmount.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="tenure">Tenure (Months)</Label>
            <div className="relative mt-2">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="tenure"
                type="number"
                placeholder="Number of months"
                className="pl-10"
                {...register('tenure', { valueAsNumber: true })}
              />
            </div>
            {errors.tenure && (
              <p className="text-red-500 text-sm mt-1">{errors.tenure.message}</p>
            )}
          </div>

          <div>
            <Label>Estimated EMI (Monthly)</Label>
            <div className="mt-2 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-2xl font-bold text-premium-blue">₹ {calculateEMI().toLocaleString('en-IN')}</p>
              <p className="text-xs text-muted-foreground mt-1">Interest Rate: 5.5% p.a.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card-premium">
        <h3 className="text-lg font-semibold mb-6">Additional Information</h3>

        <div className="space-y-6">
          <div>
            <Label htmlFor="purpose">Purpose of Loan</Label>
            <Input
              id="purpose"
              placeholder="e.g., Home renovation, Business expansion"
              className="mt-2"
              {...register('purpose')}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="collateralType">Collateral Type (if applicable)</Label>
              <Input
                id="collateralType"
                placeholder="e.g., Gold, Property"
                className="mt-2"
                {...register('collateralType')}
              />
            </div>

            <div>
              <Label htmlFor="collateralValue">Collateral Value (₹)</Label>
              <Input
                id="collateralValue"
                type="number"
                placeholder="Enter value"
                className="mt-2"
                {...register('collateralValue', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="btn-premium-primary w-full"
        disabled={createLoan.isPending}
      >
        {createLoan.isPending ? (
          <>
            <Loader className="h-4 w-4 mr-2 animate-spin" />
            Submitting Application...
          </>
        ) : (
          'Submit Application'
        )}
      </Button>
    </form>
  )
}
