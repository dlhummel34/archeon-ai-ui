"use client"

import { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

interface Opportunity {
  id: string
  title: string
}

interface CompareProps {
  opportunities: Opportunity[]
}

function useOpportunityData(ids: string[]) {
  const [data, setData] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        setLoading(true)
        // Your fetch logic here
        // const response = await fetch(...)
        // const data = await response.json()
        // setData(data)
      } catch (err) {
        setError(err as Error)
        toast({
          title: 'Error',
          description: 'Failed to load opportunities',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunities()
  }, [ids, toast])

  return { data, loading, error }
}

export default function OpportunityCompare({ opportunities }: CompareProps) {
  const { data, loading, error } = useOpportunityData(opportunities.map(o => o.id))

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 rounded-md bg-red-50">
        Failed to load opportunities. Please try again.
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        {data.map((opportunity) => (
          <div key={opportunity.id} className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">{opportunity.title}</h3>
          </div>
        ))}
      </div>
    </ErrorBoundary>
  )
}
