"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, User, TrendingUp, CheckCircle } from "lucide-react"
import { CompletionStep } from "./CompletionStep" // Import CompletionStep

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    personalInfo: {
      dateOfBirth: "",
      phoneNumber: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
    },
    verification: {
      idType: "",
      idNumber: "",
      agreedToTerms: false,
      agreedToKYC: false,
    },
    preferences: {
      tradingExperience: "",
      investmentGoals: "",
      riskTolerance: "",
      preferredCurrency: "",
    },
  })

  const steps = [
    {
      title: "Personal Information",
      description: "Tell us about yourself",
      icon: User,
      component: PersonalInfoStep,
    },
    {
      title: "Identity Verification",
      description: "Verify your identity for security",
      icon: User,
      component: VerificationStep,
    },
    {
      title: "Trading Preferences",
      description: "Customize your trading experience",
      icon: TrendingUp,
      component: PreferencesStep,
    },
    {
      title: "Complete Setup",
      description: "You're all set to start trading",
      icon: CheckCircle,
      component: CompletionStep,
    },
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      window.location.href = "/dashboard"
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand & Progress */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-16 h-16 border border-white/20 rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-2xl font-bold">BITZURI</span>
          </div>

          {/* Progress Section */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl font-bold leading-tight">Complete your setup</h1>
              <p className="text-xl text-white/80 max-w-md">
                Just a few more steps to start trading cryptocurrencies with confidence.
              </p>
            </motion.div>

            {/* Step Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = index === currentStep
                  const isCompleted = index < currentStep
                  return (
                    <motion.div
                      key={index}
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                        isActive ? "bg-white/20" : isCompleted ? "bg-white/10" : "bg-white/5"
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? "bg-green-500"
                            : isActive
                              ? "bg-white text-purple-600"
                              : "bg-white/20 border border-white/30"
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="w-6 h-6 text-white" /> : <Icon className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${isActive ? "text-white" : "text-white/80"}`}>{step.title}</h3>
                        <p className={`text-sm ${isActive ? "text-white/90" : "text-white/60"}`}>{step.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Progress</span>
                  <span className="text-white">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <motion.div
                    className="bg-white rounded-full h-3"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center items-end space-x-6"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold">₿</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold">Ξ</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <CheckCircle className="w-5 h-5 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Mobile Logo & Progress */}
          <div className="lg:hidden space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                BITZURI
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-gray-900 font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Form Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">{steps[currentStep].title}</h2>
            <p className="text-gray-600">{steps[currentStep].description}</p>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent formData={formData} setFormData={setFormData} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              className="h-12 px-6 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button onClick={nextStep} className="h-12 px-6 bg-black hover:bg-gray-800 text-white font-medium">
              {currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function PersonalInfoStep({ formData, setFormData }: any) {
  const updatePersonalInfo = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dob" className="text-sm font-medium text-gray-700">
            Date of Birth
          </Label>
          <Input
            id="dob"
            type="date"
            className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            value={formData.personalInfo.dateOfBirth}
            onChange={(e) => updatePersonalInfo("dateOfBirth", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            value={formData.personalInfo.phoneNumber}
            onChange={(e) => updatePersonalInfo("phoneNumber", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
          Street Address
        </Label>
        <Input
          id="address"
          placeholder="123 Main Street"
          className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          value={formData.personalInfo.address}
          onChange={(e) => updatePersonalInfo("address", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium text-gray-700">
            City
          </Label>
          <Input
            id="city"
            placeholder="New York"
            className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            value={formData.personalInfo.city}
            onChange={(e) => updatePersonalInfo("city", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm font-medium text-gray-700">
            Country
          </Label>
          <Select value={formData.personalInfo.country} onValueChange={(value) => updatePersonalInfo("country", value)}>
            <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ke">Kenya</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="postal" className="text-sm font-medium text-gray-700">
            Postal Code
          </Label>
          <Input
            id="postal"
            placeholder="10001"
            className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            value={formData.personalInfo.postalCode}
            onChange={(e) => updatePersonalInfo("postalCode", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

function VerificationStep({ formData, setFormData }: any) {
  const updateVerification = (field: string, value: string | boolean) => {
    setFormData((prev: any) => ({
      ...prev,
      verification: { ...prev.verification, [field]: value },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="idType" className="text-sm font-medium text-gray-700">
            ID Type
          </Label>
          <Select value={formData.verification.idType} onValueChange={(value) => updateVerification("idType", value)}>
            <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="Select ID type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="drivers-license">Driver's License</SelectItem>
              <SelectItem value="national-id">National ID</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="idNumber" className="text-sm font-medium text-gray-700">
            ID Number
          </Label>
          <Input
            id="idNumber"
            placeholder="Enter your ID number"
            className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            value={formData.verification.idNumber}
            onChange={(e) => updateVerification("idNumber", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={formData.verification.agreedToTerms}
            onCheckedChange={(checked) => updateVerification("agreedToTerms", checked)}
            className="mt-1"
          />
          <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
            I agree to the{" "}
            <a href="#" className="text-purple-600 hover:text-purple-700 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-purple-600 hover:text-purple-700 underline">
              Privacy Policy
            </a>
          </Label>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox
            id="kyc"
            checked={formData.verification.agreedToKYC}
            onCheckedChange={(checked) => updateVerification("agreedToKYC", checked)}
            className="mt-1"
          />
          <Label htmlFor="kyc" className="text-sm text-gray-700 leading-relaxed">
            I consent to KYC (Know Your Customer) verification process and understand that my identity will be verified
            for security and compliance purposes.
          </Label>
        </div>
      </div>
    </div>
  )
}

function PreferencesStep({ formData, setFormData }: any) {
  const updatePreferences = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: value },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
            Trading Experience
          </Label>
          <Select
            value={formData.preferences.tradingExperience}
            onValueChange={(value) => updatePreferences("tradingExperience", value)}
          >
            <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
              <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
              <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="goals" className="text-sm font-medium text-gray-700">
            Investment Goals
          </Label>
          <Select
            value={formData.preferences.investmentGoals}
            onValueChange={(value) => updatePreferences("investmentGoals", value)}
          >
            <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="Select your goals" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="long-term">Long-term Investment</SelectItem>
              <SelectItem value="day-trading">Day Trading</SelectItem>
              <SelectItem value="diversification">Portfolio Diversification</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="risk" className="text-sm font-medium text-gray-700">
            Risk Tolerance
          </Label>
          <Select
            value={formData.preferences.riskTolerance}
            onValueChange={(value) => updatePreferences("riskTolerance", value)}
          >
            <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="Select risk level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency" className="text-sm font-medium text-gray-700">
            Preferred Currency
          </Label>
          <Select
            value={formData.preferences.preferredCurrency}
            onValueChange={(value) => updatePreferences("preferredCurrency", value)}
          >
            <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD - US Dollar</SelectItem>
              <SelectItem value="kes">KES - Kenyan Shilling</SelectItem>
              <SelectItem value="eur">EUR - Euro</SelectItem>
              <SelectItem value="gbp">GBP - British Pound</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
