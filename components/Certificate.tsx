'use client';
import { useRef } from 'react';

export default function Certificate({ score, onClose }: { score: number; onClose: () => void }) {
  const certRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(certRef.current!, { scale: 2 });
    const link = document.createElement('a');
    link.download = 'German_A1_Certificate.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const date = new Date().toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        
        {/* Certificate Design */}
        <div 
          ref={certRef}
          className="bg-gradient-to-br from-yellow-50 to-white p-12 rounded-2xl border-8 border-yellow-600 shadow-2xl"
          style={{ aspectRatio: '1.414' }} // A4 ratio
        >
          <div className="text-center border-4 border-yellow-600 p-8 rounded-xl h-full flex-col justify-center">
            
            <p className="text-6xl mb-4">🏆</p>
            <h1 className="text-5xl font-bold text-yellow-700 mb-2">CERTIFICATE</h1>
            <p className="text-xl text-gray-600 mb-8">OF COMPLETION</p>
            
            <p className="text-lg text-gray-700 mb-4">This is to certify that</p>
            <p className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
              German Learner
            </p>
            <p className="text-lg text-gray-700 mb-8">has successfully completed</p>
            
            <h2 className="text-4xl font-bold text-yellow-700 mb-4">GERMAN A1 LEVEL</h2>
            <p className="text-gray-600 mb-8">Basic German Language Course</p>
            
            <div className="flex justify-between items-end mt-auto">
              <div className="text-left">
                <p className="text-gray-600 text-sm">Score Achieved</p>
                <p className="text-2xl font-bold text-green-600">{score}/15</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-yellow-600 rounded-full flex items-center justify-center mb-2">
                  <p className="text-4xl">✓</p>
                </div>
                <p className="text-xs text-gray-600">A1 Verified</p>
              </div>
              
              <div className="text-right">
                <p className="text-gray-600 text-sm">Date</p>
                <p className="text-lg font-bold text-gray-900">{date}</p>
              </div>
            </div>
            
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button 
            onClick={downloadCertificate}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 py-4 rounded-xl font-bold text-lg transition"
          >
            📥 Download Certificate
          </button>
          <button 
            onClick={onClose}
            className="px-8 bg-gray-700 hover:bg-gray-600 py-4 rounded-xl font-bold text-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}