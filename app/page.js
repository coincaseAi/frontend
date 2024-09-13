import React from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <Card className="w-full max-w-4xl overflow-hidden">
        {/* <div className="flex flex-col md:flex-row">
           <div className="w-full md:w-1/2 bg-muted-foreground/20 min-h-[300px] md:min-h-[500px]">
           </div>

           <div className="flex flex-col justify-center w-full p-6 md:w-1/2 md:p-8">
            <h1 className="mb-3 text-3xl font-bold md:text-4xl lg:text-5xl md:mb-4">Coincase</h1>
            <h2 className="mb-4 text-lg font-semibold md:text-xl lg:text-2xl md:mb-6">Investing in crypto made easy</h2>
            <p className="mb-6 text-sm md:text-base text-muted-foreground md:mb-8">
              Investing in crypto made easy. Investing in crypto made easy. Investing in crypto made easy.
              Investing in crypto made easy. Investing in crypto made easy.
            </p>
            <Button size="lg">
              Connect your wallet
            </Button>
          </div>
        </div> */}
      </Card>
    </div>
  )
}