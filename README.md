# bdLive-365bet

আধুনিক অনলাইন বেটিং + ক্যাসিনো + অ্যাফিলিয়েট সিস্টেমের ফ্রন্ট-এন্ড টেমপ্লেট (বাংলা)।

## নতুন যোগ হয়েছে: প্যানেল সিস্টেম
- **ইউজার প্যানেল** (`user/`): খেলোয়াড়দের জন্য গেম, ডিপোজিট, উইথড্র
- **অ্যাফিলিয়েট প্যানেল** (`affiliate/`): রেফারেল, কমিশন ট্র্যাকিং
- **অ্যাডমিন প্যানেল** (`admin/`): ইউজার/ট্রানজেকশন/গেম ম্যানেজমেন্ট

লগইন পেজে রোল সিলেক্ট করে ডেমো করুন।

## ইনস্টলেশন
git clone https://github.com/YOUR-USERNAME/bdLive-365bet.git
Live Server দিয়ে index.html ওপেন করুন।

## প্যানেল অ্যাক্সেস
- লগইন → রোল: user → user/dashboard.html
- রোল: affiliate → affiliate/dashboard.html
- রোল: admin → admin/dashboard.html

## টেকনোলজি
HTML/CSS/JS, LocalStorage, Fake Data

## সতর্কতা
শুধু ডেমো/লার্নিং। রিয়েল গ্যাম্বলিং/টাকা ব্যবহার নিষিদ্ধ।
bdLive-365bet/
├── index.html                  # হোমপেজ (পাবলিক)
├── login.html                  # লগইন (রোল সিলেক্ট যোগ করা হবে)
├── register.html               # রেজিস্টার
├── 
├── user/                       # ইউজার প্যানেল (সাধারণ খেলোয়াড়)
│   ├── dashboard.html          # ইউজার ড্যাশবোর্ড
│   ├── profile.html
│   ├── deposit.html
│   ├── withdraw.html
│   ├── games.html
│   ├── sports.html
│   ├── live-casino.html
│   └── bets-history.html       # নতুন: বেট হিস্ট্রি
├── 
├── affiliate/                  # অ্যাফিলিয়েট প্যানেল (রেফারেল মার্কেটিং)
│   ├── dashboard.html          # অ্যাফিলিয়েট ড্যাশবোর্ড
│   ├── referrals.html          # রেফারেল লিস্ট + কমিশন
│   ├── commissions.html        # কমিশন হিস্ট্রি
│   ├── promo-tools.html        # প্রমোশন টুলস (লিঙ্ক জেনারেটর)
│   └── payouts.html            # পেআউট রিকোয়েস্ট
├── 
├── admin/                      # অ্যাডমিন প্যানেল (ম্যানেজমেন্ট)
│   ├── dashboard.html          # অ্যাডমিন ড্যাশবোর্ড
│   ├── users.html              # সব ইউজার ম্যানেজ
│   ├── affiliates.html         # অ্যাফিলিয়েট ম্যানেজ
│   ├── transactions.html       # ডিপোজিট/উইথড্র লিস্ট
│   ├── games-management.html   # গেম/ম্যাচ অ্যাড/এডিট
│   ├── promotions.html         # প্রমোশন ম্যানেজ
│   └── settings.html           # সাইট সেটিংস
├── 
├── css/                        # একই (style.css, responsive.css)
├── js/
│   ├── main.js                 # কমন (লোডার, নোটিফিকেশন, auth check)
│   ├── fake-data.js            # আপডেট: users-এ role যোগ করা হবে
│   ├── auth.js                 # লগইন/রোল চেক + রিডাইরেক্ট
│   └── panels.js               # নতুন: প্যানেল-স্পেসিফিক ফাংশন
├── images/                     # লোগো, আইকন ইত্যাদি
└── README.md                   # নিচের কন্টেন্ট আপডেট করে পেস্ট করুন
<select id="role" required>
  <option value="user">ইউজার (খেলোয়াড়)</option>
  <option value="affiliate">অ্যাফিলিয়েট</option>
  <option value="admin">অ্যাডমিন</option>
</select>// লগইন সাকসেস হলে
let user = { username: username, role: document.getElementById('role').value };
localStorage.setItem('user', JSON.stringify(user));

if (user.role === 'user') window.location.href = 'user/dashboard.html';
else if (user.role === 'affiliate') window.location.href = 'affiliate/dashboard.html';
else if (user.role === 'admin') window.location.href = 'admin/dashboard.html';
// js/main.js-এ যোগ করুন
function checkAuth() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (!user) window.location.href = '../login.html';
  // রোল-ভিত্তিক অ্যাক্সেস চেক (অপশনাল)
}
window.onload = checkAuth;
