import React from 'react';

interface VerificationItem {
  name: string;
  studentId: string;
  collegeName: string;
  graduationYear: string;
  id: string;
  imageUrl: string;
}

const Verifying: React.FC = () => {
  const verificationItems: VerificationItem[] = [
    {
      name: 'abcdef ghijklmno',
      studentId: 'xxxxxxxxx',
      collegeName: 'Gandhi Hospital-Hyderabad',
      graduationYear: '2019',
      id: '1',
      imageUrl: '/student-id.png'
    },
    {
      name: 'abcdef ghijklmno',
      studentId: 'xxxxxxxxx',
      collegeName: 'Gandhi Hospital-Hyderabad',
      graduationYear: '2019',
      id: '2',
      imageUrl: '/student-id.png'
    },
    {
      name: 'abcdef ghijklmno',
      studentId: 'xxxxxxxxx',
      collegeName: 'Gandhi Hospital-Hyderabad',
      graduationYear: '2019',
      id: '3',
      imageUrl: '/student-id.png'
    },
    {
      name: 'abcdef ghijklmno',
      studentId: 'xxxxxxxxx',
      collegeName: 'Gandhi Hospital-Hyderabad',
      graduationYear: '2019',
      id: '4',
      imageUrl: '/student-id.png'
    },
    {
      name: 'abcdef ghijklmno',
      studentId: 'xxxxxxxxx',
      collegeName: 'Gandhi Hospital-Hyderabad',
      graduationYear: '2019',
      id: '5',
      imageUrl: '/student-id.png'
    }
  ];

  const handleAccept = (id: string) => {
    console.log('Accepted:', id);
    // Implement accept logic
  };

  const handleReject = (id: string) => {
    console.log('Rejected:', id);
    // Implement reject logic
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 font-fontsm">
      {/* Navigation Tabs */}
      <div className="flex space-x-8 mb-8 border-b border-gray-200">
        <button className="text-gray-500 hover:text-gray-700 pb-4">
          Verify Organization
        </button>
        <button className="text-gray-500 hover:text-gray-700 pb-4">
          Verify Doctor
        </button>
        <button className="text-blue-500 border-b-2 border-blue-500 pb-4">
          Verify Student
        </button>
      </div>

      {/* Verification List */}
      <div className="space-y-6">
        {verificationItems.map((item) => (
          <div key={item.id} className="border-b border-gray-200 pb-6">
            <div className="flex justify-evenly gap-8 ">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <div className="text-gray-500 text-sm mb-1">Name</div>
                  <div className="text-gray-900">{item.name}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-1">College name</div>
                  <div className="text-gray-900">{item.collegeName}</div>
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-4">
                <div>
                  <div className="text-gray-500 text-sm mb-1">Student identification number</div>
                  <div className="text-gray-900">{item.studentId}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-1">Graduation year</div>
                  <div className="text-gray-900">{item.graduationYear}</div>
                </div>
              </div>

              <div className="w-[200px] h-[100px] bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt="Student ID" 
                    className="w-full text-gray-600 text-sm h-full object-cover"
                  />
                </div>


              {/* Right Column */}


              <div className=" flex items-center">
                
                <div className="flex  space-x-3 ">
                  <button
                    onClick={() => handleAccept(item.id)}
                    className="px-6 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-600 text-sm hover:bg-green-100 transition-colors"
                  >
                    Accept ✓
                  </button>
                  <button
                    onClick={() => handleReject(item.id)}
                    className="px-6 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-sm hover:bg-red-100 transition-colors"
                  >
                    Reject ✗
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Verifying;