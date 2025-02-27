import React, { useEffect, useState } from 'react';
// สมมติ Header สำหรับหน้านี้เป็นแบบย่อ (MinimalHeader) 
// หรือถ้าอยากใช้ header ตัวเดิม แต่ให้ปรับ UI ก็แก้เองได้เช่นกัน
import MinimalHeader from '../header_for_other/MinimalHeader';

// ตัวอย่าง: รูปภาพ Avatar หรือ Dummy data (ถ้าไม่มี user จริง)
import dummyProfilePic from '../../images/user1.jpg';
import dummyTripPic from '../../images/user2.jpg';

function TripTogetherPage() {
  // ในของจริงคุณคง fetch ข้อมูลบล็อกจาก Backend (API) 
  // แต่ตอนนี้เอา dummy data มาทดลองก่อน
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // เรียก API (ถ้ามี) เช่น:
    // fetch('http://localhost:5000/api/trips')
    //   .then(res => res.json())
    //   .then(data => setBlogs(data))
    //   .catch(err => console.error(err));

    // ตัวอย่าง mock data แบบ manual
    const dummyBlogs = [
      {
        _id: '123',
        userProfilePic: dummyProfilePic,
        userName: 'Alice',
        country: 'Japan',
        tripImage: dummyTripPic,
        shortDescription: 'ทริปญี่ปุ่น 3 วัน 2 คืน สนุกมากเลย',
      },
      {
        _id: '456',
        userProfilePic: dummyProfilePic,
        userName: 'Bob',
        country: 'Thailand',
        tripImage: dummyTripPic,
        shortDescription: 'เที่ยวเหนือ เชียงใหม่-ปาย อากาศดี',
      },
    ];
    setBlogs(dummyBlogs);
  }, []);

  return (
    <>
      {/* หากต้องการ header แบบ minimal */}
      <MinimalHeader />

      {/* ส่วนคอนเทนต์ของหน้า */}
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Trip Together</h1>

        {/* แสดงรายการบล็อกเป็น list */}
        <div className="grid gap-4">
          {blogs.map(blog => (
            <div key={blog._id} className="border rounded p-4 shadow-sm">
              {/* ส่วนข้อมูลผู้ใช้ + ประเทศ */}
              <div className="flex items-center mb-2">
                <img
                  src={blog.userProfilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <div className="font-semibold">{blog.userName}</div>
                  <div className="text-sm text-gray-600">{blog.country}</div>
                </div>
              </div>

              {/* รูปภาพทริป */}
              <div className="my-2">
                <img
                  src={blog.tripImage}
                  alt="Trip"
                  className="w-full h-auto object-cover rounded"
                />
              </div>

              {/* คำอธิบายสั้น ๆ */}
              <p className="text-gray-800">{blog.shortDescription}</p>

              {/* ลิงก์ see more */}
              <div className="mt-2 text-right">
                {/* ตัวอย่าง: ไปหน้า /trip/:id */}
                <a 
                  href={`/trip/${blog._id}`} 
                  className="text-blue-600 underline"
                >
                  See more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TripTogetherPage;