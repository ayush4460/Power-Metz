import React, { forwardRef } from 'react'

export interface WarrantyData {
  warrantyId: string;
  serialNumber: string;
  productCategory: string;
  productModel: string;
  customerName: string;
  customerLocation?: string;
  installerName?: string;
  warrantyPlan: string;
  installDate?: string | Date;
  expiryDate?: string | Date;
}

type WarrantyCertificateProps = {
  warranty: WarrantyData
}

export const WarrantyCertificate = forwardRef<HTMLDivElement, WarrantyCertificateProps>(
  ({ warranty }, ref) => {
    if (!warranty) return null;

    return (
      <div 
        ref={ref}
        className="bg-white"
        style={{ 
          width: '800px', 
          minHeight: '1131px', // A4 aspect ratio (210 x 297mm) -> roughly 800 x 1131
          padding: '60px',
          fontFamily: 'Arial, sans-serif',
          color: '#1e293b',
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
        }}
      >
        {/* Outer Border */}
        <div 
          style={{
            border: '4px solid #F58220',
            height: '100%',
            padding: '40px',
            position: 'relative',
            backgroundColor: '#ffffff'
          }}
        >
          {/* Inner Border */}
          <div
            style={{
              border: '1px solid #cbd5e1',
              height: '100%',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header / Logo */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '24px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/Power_Metz_Logo.png" 
                  alt="PowerMetz Logo"
                  style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                />
                <div style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
                  Power<span style={{ color: '#F58220' }}>Metz</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#F58220', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>
                  Warranty Certificate
                </h1>
                <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
                  Certificate No: {warranty.warrantyId}
                </p>
              </div>
            </div>

            {/* Introductory Text */}
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#475569', marginBottom: '40px' }}>
              This document certifies that the product described below is protected by the PowerMetz 
              industrial warranty program. This warranty guarantees that the product is free from 
              defects in material and workmanship under normal use and service during the warranty period.
            </p>

            {/* Details Grid */}
            <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
              {/* Product Info */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', borderBottom: '1px solid #F58220', paddingBottom: '8px', marginBottom: '16px', color: '#0f172a' }}>
                  Product Details
                </h3>
                <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                  <tbody>
                    <tr>
                      <td style={{ color: '#64748b', fontWeight: 600, width: '40%' }}>Category:</td>
                      <td style={{ fontWeight: 500, textTransform: 'uppercase' }}>{warranty.productCategory}</td>
                    </tr>
                    <tr>
                      <td style={{ color: '#64748b', fontWeight: 600 }}>Model Number:</td>
                      <td style={{ fontWeight: 500 }}>{warranty.productModel}</td>
                    </tr>
                    <tr>
                      <td style={{ color: '#64748b', fontWeight: 600 }}>Serial Number:</td>
                      <td style={{ fontWeight: 500 }}>{warranty.serialNumber}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Customer Info */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', borderBottom: '1px solid #F58220', paddingBottom: '8px', marginBottom: '16px', color: '#0f172a' }}>
                  Customer Details
                </h3>
                <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                  <tbody>
                    <tr>
                      <td style={{ color: '#64748b', fontWeight: 600, width: '40%' }}>Customer Name:</td>
                      <td style={{ fontWeight: 500 }}>{warranty.customerName}</td>
                    </tr>
                    <tr>
                      <td style={{ color: '#64748b', fontWeight: 600 }}>Location:</td>
                      <td style={{ fontWeight: 500 }}>{warranty.customerLocation || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td style={{ color: '#64748b', fontWeight: 600 }}>Installer:</td>
                      <td style={{ fontWeight: 500 }}>{warranty.installerName || 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Warranty Terms */}
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: 'auto' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>
                Warranty Coverage Information
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 4px 0' }}>Warranty Plan</p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#F58220' }}>{warranty.warrantyPlan}</p>
                </div>
                <div>
                  <p style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 4px 0' }}>Installation Date</p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
                    {warranty.installDate ? new Date(warranty.installDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 4px 0' }}>Valid Until</p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
                    {warranty.expiryDate ? new Date(warranty.expiryDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
              <div style={{ fontSize: '12px', color: '#64748b', maxWidth: '100%' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold', color: '#1e293b' }}>
                  Power<span style={{ color: '#F58220' }}>Metz</span>
                </p>
                <p style={{ margin: '0 0 4px 0' }}>+91 7041647216 | business@metzbattery.in</p>
                <p style={{ margin: 0, lineHeight: '1.5' }}>
                  NH48, Block No. 28, Powermetz Energy Pvt Ltd, Mercury EV Tech Pvt Ltd, Village - Manglej, Taluka - Karjan, Vadodara, Gujarat - 391243, India
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    )
  }
)

WarrantyCertificate.displayName = 'WarrantyCertificate'
