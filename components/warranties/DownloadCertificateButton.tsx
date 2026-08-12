'use client'

import React, { useState, useRef } from 'react'
import { Printer } from 'lucide-react'
import { WarrantyCertificate, type WarrantyData } from './WarrantyCertificate'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export function DownloadCertificateButton({ warranty }: { warranty: WarrantyData }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!certificateRef.current) return
    setIsGenerating(true)
    
    try {
      const element = certificateRef.current
      
      // We temporarily bring it into viewport to ensure html2canvas can read all styles properly, 
      // but keep it hidden via opacity/z-index just in case. Actually html2canvas can often capture 
      // elements positioned off-screen if they are absolute.
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`PowerMetz_Warranty_${warranty.warrantyId}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <button 
        onClick={handleDownload}
        disabled={isGenerating}
        className="flex items-center space-x-2 bg-[#F58220] text-white px-4 py-2 rounded-md hover:bg-[#F58220]/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
      >
        <Printer className="w-4 h-4" />
        <span>{isGenerating ? 'Generating...' : 'Download Certificate'}</span>
      </button>
      
      {/* Hidden Certificate */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <WarrantyCertificate ref={certificateRef} warranty={warranty} />
      </div>
    </>
  )
}
