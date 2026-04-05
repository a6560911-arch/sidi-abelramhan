import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Zap, 
  Heart, 
  Award, 
  ChevronDown,
  Utensils,
  Menu,
  X,
  ArrowRight,
  Check,
  MessageCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Types
interface MenuItem {
  name: string;
  description: string;
  prices: { small: number; double: number; triple: number };
  image: string;
  badge?: string;
  category: string;
}

// Menu Data
const menuItems = {
  chicken: [
    { name: 'Chicken Mayo', description: 'صدور الدجاج المقرمشة بصوص المايونيز والجبنة اللذيذة والخص والطماطم', prices: { small: 115, double: 150, triple: 205 }, image: 'https://images.unsplash.com/photo-1513185158878-8d8c196b3f88?q=80&w=1470&auto=format&fit=crop', category: 'chicken' },
    { name: 'Chicken Cheddar', description: 'صدور الدجاج المقلية المتبلة بصوص الشيدر والخص والمايونيز', prices: { small: 115, double: 160, triple: 215 }, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1470&auto=format&fit=crop', category: 'chicken' },
    { name: 'Chicken Texas', description: 'صدور الدجاج المقرمشة مع تركي مدخن وصوص تكساس الحار والخص والجبنة', prices: { small: 135, double: 175, triple: 225 }, image: 'https://images.unsplash.com/photo-1594221708779-94832f4320d1?q=80&w=1470&auto=format&fit=crop', badge: 'الأكثر مبيعاً', category: 'chicken' },
    { name: 'Chicken Pizza', description: 'صدور الدجاج المقرمشة مع صوص البيتزا الشهير والموتزريلا والخص والزيتون', prices: { small: 115, double: 180, triple: 220 }, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1470&auto=format&fit=crop', category: 'chicken' },
    { name: 'Chicken New York', description: 'صدور الدجاج المتبلة بخلطة نيويورك المميزة وصوص الموتزريلا السايحة', prices: { small: 130, double: 170, triple: 220 }, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1530&auto=format&fit=crop', category: 'chicken' },
    { name: 'Chicken Mushroom', description: 'صدور الدجاج المقرمشة مع قطع المشروم الفريش وصوص المشروم الكريمي', prices: { small: 135, double: 175, triple: 225 }, image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=1470&auto=format&fit=crop', category: 'chicken' }
  ],
  beef: [
    { name: 'Beef Mayo', description: 'قطعة البرجر المشوية بصوص المايونيز المميز والجبنة الشيدر والخص والطماطم والبصل', prices: { small: 115, double: 160, triple: 215 }, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1470&auto=format&fit=crop', category: 'beef' },
    { name: 'Beef Cheddar', description: 'قطعة البرجر المشوية مع صوص الشيدر السايح الغرقان والخص والطماطم والبصل', prices: { small: 115, double: 165, triple: 220 }, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=1470&auto=format&fit=crop', category: 'beef' },
    { name: 'Beef Pizza', description: 'برجر لحم مشوي بصوص البيتزا والموتزريلا والخص والطماطم والزيتون', prices: { small: 120, double: 165, triple: 220 }, image: 'https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?q=80&w=1470&auto=format&fit=crop', category: 'beef' },
    { name: 'Beef Tiger', description: 'برجر لحم مشوي بصوص تايجر الحار والتركى المدخن والجبنة الشيدر والخص', prices: { small: 115, double: 170, triple: 220 }, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=1470&auto=format&fit=crop', category: 'beef' },
    { name: 'Beef Texas', description: 'برجر لحم مشوي بصوص تكساس المميز مع التركي المدخن والجبنة والخص', prices: { small: 135, double: 175, triple: 225 }, image: 'https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?q=80&w=1470&auto=format&fit=crop', badge: 'توصية الشيف', category: 'beef' },
    { name: 'Beef New York', description: 'برجر لحم مشوي بصوص نيويورك الحار والخص والجبنة الشيدر والطماطم', prices: { small: 140, double: 185, triple: 225 }, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1470&auto=format&fit=crop', category: 'beef' },
    { name: 'Beef Mushroom', description: 'برجر لحم مشوي بصوص المشروم الفريش وصوص المشروم الكريمي اللذيذ', prices: { small: 140, double: 175, triple: 220 }, image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3a99?q=80&w=1470&auto=format&fit=crop', category: 'beef' }
  ]
};

// WhatsApp Button Component
const WhatsAppButton = () => {
  const handleClick = () => {
    window.open('https://wa.me/201007171842', '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-colors"
      title="اتصل بنا عبر واتساب"
    >
      <MessageCircle size={28} />
    </motion.button>
  );
};

// Menu Card Component
const MenuCard = ({ item, onOrder }: { item: MenuItem; onOrder: (item: MenuItem) => void }) => {
  const [selectedSize, setSelectedSize] = useState<'small' | 'double' | 'triple'>('small');
  const [isHovered, setIsHovered] = useState(false);

  const sizeLabels = {
    small: 'عادي',
    double: 'دبل',
    triple: 'تريبل'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl overflow-hidden shadow-xl border border-white/10 group"
    >
      <div className="relative h-52 overflow-hidden">
        <motion.img
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
        
        {item.badge && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1.5 rounded-full text-sm font-black shadow-lg"
          >
            {item.badge}
          </motion.div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-black mb-2 group-hover:text-orange-500 transition-colors">{item.name}</h3>
        <p className="text-gray-400 text-sm mb-5 leading-relaxed">{item.description}</p>

        <div className="flex gap-2 mb-5 bg-neutral-950 p-1.5 rounded-2xl">
          {(['small', 'double', 'triple'] as const).map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-bold transition-all ${
                selectedSize === size
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {sizeLabels[size]}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-3xl font-black text-orange-500">
            {item.prices[selectedSize]}
            <span className="text-base text-gray-400 mr-1">جنيه</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOrder(item)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-orange-500/25"
          >
            اطلب <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center"
  >
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl mb-5">
      <Icon className="text-orange-500" size={32} />
    </div>
    <h3 className="text-xl font-black mb-3">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

// Main App Component
export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [orderNotification, setOrderNotification] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrder = (item: MenuItem) => {
    setOrderNotification(`تم إضافة ${item.name} إلى الطلب!`);
    setTimeout(() => setOrderNotification(null), 3000);
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'menu', label: 'المنيو' },
    { id: 'about', label: 'عن المطعم' },
    { id: 'gallery', label: 'المعرض' },
    { id: 'contact', label: 'تواصل معنا' }
  ];

  return (
    <div className="bg-black text-white min-h-screen rtl overflow-x-hidden" dir="rtl">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 origin-right z-[100]" 
        style={{ scaleX }} 
      />

      {/* Order Notification */}
      <AnimatePresence>
        {orderNotification && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[90] bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-black shadow-2xl flex items-center gap-3"
          >
            <Check size={24} />
            {orderNotification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-2xl py-3 shadow-2xl' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-red-500/30">
              S
            </div>
            <span className="font-black text-2xl tracking-tight hidden sm:block">
              سيدي <span className="text-orange-500">عبد الرحمن</span>
            </span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-2 font-bold bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-5 py-2.5 rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('menu')}
              className="hidden sm:flex bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-7 py-3 rounded-2xl font-black shadow-lg shadow-orange-500/30 items-center gap-2"
            >
              اطلب دلوقتي <Utensils size={18} />
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-6 right-6 z-40 bg-neutral-900/95 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-right px-6 py-4 rounded-2xl font-bold text-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('menu')}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-2xl font-black text-xl mt-4 shadow-lg"
              >
                اطلب دلوقتي
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-40 scale-105"
            alt="Atmosphere"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 px-5 py-2.5 rounded-full mb-8"
          >
            <Star className="text-orange-500" size={16} fill="currentColor" />
            <span className="font-bold text-orange-400">الأفضل في بني سويف منذ 2015</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
          >
            أحلى تجربة  اكل  في <br />
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
              بني سويف
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 font-bold max-w-3xl mx-auto"
          >
            ساندويتشات فراخ ولحم – طعم مختلف وجودة عالية وخدمة ممتازة
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('menu')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-orange-500/30 flex items-center justify-center gap-3 group"
            >
              شوف المنيو <ChevronDown className="group-hover:translate-y-1 transition-transform" size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('contact')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/20 px-12 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3"
            >
              تواصل معنا <Phone size={20} />
            </motion.button>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 15, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white opacity-40"
        >
          <ChevronDown size={45} />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 -mt-20 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Award} 
              title="جودة عالية" 
              description="مكونات طازجة يومياً وأعلى معايير النظافة"
            />
            <FeatureCard 
              icon={Zap} 
              title="سرعة تحضير" 
              description="طلبك جاهز في أقل من 10 دقائق"
            />
            <FeatureCard 
              icon={Star} 
              title="طعم مميز" 
              description="خلطات سرية تجمع بين الأصالة والحداثة"
            />
            <FeatureCard 
              icon={Heart} 
              title="أسعار مناسبة" 
              description="قيمة ممتازة مقابل أفضل جودة"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-gradient-to-b from-neutral-950 to-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-500 font-black uppercase tracking-widest text-sm mb-5 block">قصتنا</span>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              مطعم وكافيه <br />
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                سيدي عبد الرحمن
              </span>
            </h2>
            <p className="text-gray-300 text-xl leading-relaxed mb-10">
              كافيه ومطعم سيدي عبد الرحمن بيقدم أفضل ساندويتشات الفراخ واللحوم بجودة عالية وطعم مميز في بني سويف.
              خبرتنا في عالم الطهي بتخلينا نقدم تجربة استثنائية لكل عميل، مع الاهتمام بأدق التفاصيل من أول المكونات لحد التقديم.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              {[
                { number: '8+', label: 'سنوات خبرة' },
                { number: '50K+', label: 'عميل سعيد' },
                { number: '15+', label: 'صنف مميز' },
                { number: '24/7', label: 'متواصلين' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-2xl border border-white/10 text-center"
                >
                  <div className="text-4xl font-black text-orange-500 mb-2">{stat.number}</div>
                  <div className="text-gray-400 font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-[3rem] -z-10" />
            <img 
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1470&auto=format&fit=crop" 
              className="rounded-[3rem] shadow-2xl w-full aspect-square object-cover border-4 border-white/10"
              alt="Restaurant Atmosphere"
            />
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-orange-500 font-black uppercase tracking-widest text-sm mb-5 block">المنيو</span>
              <h2 className="text-5xl md:text-7xl font-black mb-6">اختار ساندوتشك المفضل</h2>
              <div className="h-2 w-32 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full" />
            </motion.div>
          </div>

          {/* Chicken Section */}
          <div className="mb-24">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-12 pr-6 border-r-4 border-orange-500"
            >
              <div className="bg-gradient-to-r from-orange-500/20 to-transparent p-5 rounded-2xl">
                <span className="text-5xl">🍗</span>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-black text-white">ساندويتشات الفراخ</h3>
                <p className="text-gray-400 text-lg mt-2">ألطعم وأجدد أنواع الساندويتشات</p>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-orange-500/50 to-transparent" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.chicken.map((item, idx) => (
                <MenuCard key={idx} item={item} onOrder={handleOrder} />
              ))}
            </div>
          </div>

          {/* Beef Section */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-12 pr-6 border-r-4 border-red-500"
            >
              <div className="bg-gradient-to-r from-red-500/20 to-transparent p-5 rounded-2xl">
                <span className="text-5xl">🥩</span>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-black text-white">ساندويتشات اللحم</h3>
                <p className="text-gray-400 text-lg mt-2">برجر لحم مشوي على الفحم بجودة ممتازة</p>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-red-500/50 to-transparent" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.beef.map((item, idx) => (
                <MenuCard key={idx} item={item} onOrder={handleOrder} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6 bg-gradient-to-b from-black to-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-orange-500 font-black uppercase tracking-widest text-sm mb-5 block">المعرض</span>
              <h2 className="text-5xl md:text-7xl font-black mb-6">أجواء سيدي عبد الرحمن</h2>
              <p className="text-gray-400 text-xl">لحظات حقيقية من داخل المطعم</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1374&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1374&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1470&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1470&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1447&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1370&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1470&auto=format&fit=crop"
            ].map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="overflow-hidden rounded-3xl h-72 shadow-2xl group relative cursor-pointer"
              >
                <img 
                  src={img} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt="Gallery item" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                  <div className="text-center">
                    <Heart className="text-white mx-auto mb-3" size={32} fill="currentColor" />
                    <span className="font-black text-white text-lg">سيدي عبد الرحمن</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-orange-500 font-black uppercase tracking-widest text-sm mb-5 block">آراء العملاء</span>
              <h2 className="text-5xl md:text-7xl font-black mb-6">إيش يقولوا عملائنا</h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "أحمد علي", comment: "أفضل ساندويتشات في بني سويف 🔥 جربت التشيكن تكساس وكان تحفة", rating: 5, avatar: "👨‍💼" },
              { name: "سارة محمود", comment: "خدمة سريعة وطعم تحفة، المكان مريح جداً ونضيف", rating: 5, avatar: "👩‍🍳" },
              { name: "محمد جابر", comment: "البرجر عندهم عالمي بجد، والجودة ثابتة كل مرة بروح فيها", rating: 5, avatar: "👨‍🍳" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 rounded-[3rem] border border-white/10 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-transparent rounded-br-[3rem]" />
                
                <div className="text-6xl mb-6">{item.avatar}</div>
                
                <div className="flex gap-1.5 mb-6 text-orange-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-8 font-bold text-xl italic leading-relaxed">
                  "{item.comment}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center font-black text-xl">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="font-black text-white text-xl">{item.name}</p>
                    <p className="text-orange-500 font-bold">عميل مميز</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 -skew-y-3 scale-110" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMEMyMCAwIDMwIDEwIDIwIDIwQzEwIDMwIDIwIDQwIDIwIDQwQzIwIDQwIDEwIDMwIDIwIDIwQzMwIDEwIDIwIDAgMjAgMFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-50" />
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-white drop-shadow-2xl">
              جاهز تجرب أحلى ساندويتش؟
            </h2>
            <p className="text-2xl text-white/90 mb-12 font-bold max-w-3xl mx-auto">
              اطلب دلوقتي واستمتع بألذ الساندويتشات في بني سويف
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.98 }}
                href="#menu"
                className="bg-white text-gradient-to-r from-orange-600 to-red-600 px-14 py-6 rounded-[2rem] font-black text-2xl shadow-2xl hover:shadow-white/30 inline-flex items-center gap-4"
              >
                🛒 اطلب دلوقتي
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.98 }}
                href="tel:01007171842"
                className="bg-white/20 backdrop-blur-md text-white border-3 border-white px-14 py-6 rounded-[2rem] font-black text-2xl inline-flex items-center gap-4"
              >
                📞 اتصل الآن
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-b from-neutral-950 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-orange-500 font-black uppercase tracking-widest text-sm mb-5 block">تواصل معنا</span>
              <h2 className="text-5xl md:text-7xl font-black mb-6">فنحن هنا لخدمتكم</h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <motion.div 
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-start gap-6 bg-gradient-to-r from-neutral-900 to-neutral-800 p-8 rounded-[2.5rem] border border-white/10"
                >
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 rounded-[2rem] shadow-xl shadow-orange-500/30">
                    <MapPin size={36} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-2xl mb-3">📍 العنوان</h4>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      بني سويف - شرق النيل - أمام كلية تعليم صناعي
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-start gap-6 bg-gradient-to-r from-neutral-900 to-neutral-800 p-8 rounded-[2.5rem] border border-white/10"
                >
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-5 rounded-[2rem] shadow-xl shadow-green-500/30">
                    <Phone size={36} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-2xl mb-3">📞 أرقام التواصل</h4>
                    <div className="text-gray-400 text-xl space-y-3 flex flex-col items-start">
                      <a href="tel:01007171842" className="hover:text-orange-500 transition-colors font-bold">
                        📱 01007171842
                      </a>
                      <a href="tel:01148610361" className="hover:text-orange-500 transition-colors font-bold">
                        📱 01148610361
                      </a>
                      <a href="tel:01210656615" className="hover:text-orange-500 transition-colors font-bold">
                        📱 01210656615
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-start gap-6 bg-gradient-to-r from-neutral-900 to-neutral-800 p-8 rounded-[2.5rem] border border-white/10"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-5 rounded-[2rem] shadow-xl shadow-blue-500/30">
                    <Clock size={36} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-2xl mb-3">⏰ مواعيد العمل</h4>
                    <p className="text-gray-400 text-lg">
                      <span className="text-green-500 font-black text-2xl">مفتوح دائماً</span> لخدمتكم 24/7
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-12">
                <h4 className="font-black text-2xl mb-6 text-center">تابعنا على</h4>
                <div className="flex justify-center gap-6">
                  {[
                    { icon: MessageCircle, color: 'from-blue-600 to-blue-700', label: 'فيسبوك' },
                    { icon: MessageCircle, color: 'from-pink-500 via-purple-500 to-indigo-500', label: 'انستجرام' },
                    { icon: MessageCircle, color: 'from-green-500 to-emerald-600', label: 'واتساب' }
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      whileHover={{ scale: 1.2, y: -8 }}
                      whileTap={{ scale: 0.95 }}
                      href="#"
                      className={`bg-gradient-to-br ${social.color} p-6 rounded-[2rem] shadow-2xl text-white`}
                      title={social.label}
                    >
                      <social.icon size={32} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[500px] rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110900.58988691516!2d31.11186715!3d29.0805565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145a23f1c1f5139f%3A0x6b772c78f14c45a1!2sBeni%20Suef%2C%20Egypt!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-white/10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-5 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-[2rem] flex items-center justify-center font-black text-3xl shadow-2xl shadow-red-500/30">
                S
              </div>
              <div>
                <span className="font-black text-4xl block">
                  سيدي <span className="text-orange-500">عبد الرحمن</span>
                </span>
                <span className="text-gray-500 font-bold text-lg">مطعم وكافيه</span>
              </div>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-8 font-bold text-xl text-gray-400">
               <button onClick={() => scrollToSection('home')} className="hover:text-orange-500 transition-colors">الرئيسية</button>
               <button onClick={() => scrollToSection('menu')} className="hover:text-orange-500 transition-colors">المنيو</button>
               <button onClick={() => scrollToSection('about')} className="hover:text-orange-500 transition-colors">عن المطعم</button>
               <button onClick={() => scrollToSection('gallery')} className="hover:text-orange-500 transition-colors">المعرض</button>
               <button onClick={() => scrollToSection('contact')} className="hover:text-orange-500 transition-colors">تواصل معنا</button>
            </div>
          </div>
          
          <div className="text-center pt-12 border-t border-white/10">
            <p className="text-gray-500 font-black text-xl mb-4">
              &copy; {new Date().getFullYear()} سيدي عبد الرحمن. جميع الحقوق محفوظة.
            </p>
            <p className="text-orange-500 font-black text-2xl">
              تم التطوير بكل ❤️🔥 لخدمتكم
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Order Button for Mobile */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="md:hidden fixed bottom-6 left-6 right-6 z-40"
      >
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="#menu"
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-5 rounded-[2rem] font-black text-2xl shadow-2xl shadow-orange-500/50 flex items-center justify-center gap-4"
        >
           🛒 اطلب دلوقتي
        </motion.a>
      </motion.div>

      <WhatsAppButton />
    </div>
  );
}
