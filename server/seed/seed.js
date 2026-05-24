const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const Tutorial = require('../models/Tutorial');
const Blog = require('../models/Blog');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dapur_mama');
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Recipe.deleteMany({});
    await Tutorial.deleteMany({});
    await Blog.deleteMany({});

    console.log('Cleared existing data');

    // Create seed user
    const user = await User.create({
      name: 'Mama Sari',
      email: 'mama@sari.com',
      password: 'password123',
      avatar: '/uploads/avatars/avatar1.jpg'
    });

    const user2 = await User.create({
      name: 'Mama Dewi',
      email: 'mama@dewi.com',
      password: 'password123',
      avatar: '/uploads/avatars/avatar2.jpg'
    });

    console.log('Users created');

    // Create categories
    const categories = await Category.insertMany([
      {
        name: 'Sarapan',
        description: 'Resep masakan untuk sarapan pagi yang lezat dan bergizi',
        image: '/uploads/categories/sarapan.jpg'
      },
      {
        name: 'Makan Siang',
        description: 'Resep masakan untuk makan siang yang mengenyangkan',
        image: '/uploads/categories/makan-siang.jpg'
      },
      {
        name: 'Makan Malam',
        description: 'Resep masakan untuk makan malam bersama keluarga',
        image: '/uploads/categories/makan-malam.jpg'
      },
      {
        name: 'Cemilan',
        description: 'Resep cemilan dan snack ringan untuk disantap kapan saja',
        image: '/uploads/categories/cemilan.jpg'
      }
    ]);

    console.log('Categories created');

    // Create recipes
    const recipes = await Recipe.insertMany([
      {
        title: 'Nasi Goreng Spesial',
        description: 'Nasi goreng spesial dengan bumbu rahasia khas Indonesia. Rasa gurih dan pedas yang menggugah selera, cocok untuk sarapan atau makan malam.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Nasi_goreng_indonesia.jpg/960px-Nasi_goreng_indonesia.jpg',
        category: 'Sarapan',
        ingredients: [
          { name: 'Nasi putih', amount: '2 piring' },
          { name: 'Telur', amount: '2 butir' },
          { name: 'Ayam goreng suwir', amount: '100 gram' },
          { name: 'Bawang merah', amount: '4 siung' },
          { name: 'Bawang putih', amount: '3 siung' },
          { name: 'Cabai merah', amount: '5 buah' },
          { name: 'Saos tiram', amount: '2 sdm' },
          { name: 'Kecap manis', amount: '3 sdm' },
          { name: 'Garam', amount: '1/2 sdt' },
          { name: 'Minyak goreng', amount: '3 sdm' },
          { name: 'Timun', amount: '1 buah (pelengkap)' },
          { name: 'Tomat', amount: '1 buah (pelengkap)' },
          { name: 'Kerupuk', amount: 'secukupnya' }
        ],
        steps: [
          { step: 1, description: 'Haluskan bawang merah, bawang putih, dan cabai merah menggunakan blender atau ulekan.' },
          { step: 2, description: 'Panaskan minyak goreng dalam wajan dengan api sedang.' },
          { step: 3, description: 'Tumis bumbu halus hingga harum dan matang, sekitar 3-4 menit.' },
          { step: 4, description: 'Masukkan ayam goreng suwir, aduk rata selama 1 menit.' },
          { step: 5, description: 'Pecahkan telur ke dalam wajan, aduk cepat hingga telur matang dan tercampur.' },
          { step: 6, description: 'Masukkan nasi putih, aduk rata dengan bumbu.' },
          { step: 7, description: 'Tambahkan saos tiram, kecap manis, dan garam. Aduk hingga semua tercampur rata.' },
          { step: 8, description: 'Masak selama 3-4 menit hingga nasi goreng matang dan bumbu meresap.' },
          { step: 9, description: 'Sajikan nasi goreng di piring, hiasi dengan irisan timun, tomat, dan kerupuk.' }
        ],
        author: user._id,
        cookTime: '15 menit',
        servings: 2,
        likes: 45
      },
      {
        title: 'Rendang Daging Sapi',
        description: 'Rendang daging sapi autentik Minang dengan bumbu kaya rempah. Dimasak perlahan hingga empuk dan bumbu meresap sempurna.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Beef_Rendang..JPG/960px-Beef_Rendang..JPG',
        category: 'Makan Malam',
        ingredients: [
          { name: 'Daging sapi', amount: '500 gram' },
          { name: 'Santan kelapa', amount: '400 ml' },
          { name: 'Bawang merah', amount: '10 siung' },
          { name: 'Bawang putih', amount: '5 siung' },
          { name: 'Cabai merah keriting', amount: '15 buah' },
          { name: 'Cabai rawit', amount: '5 buah' },
          { name: 'Jahe', amount: '3 cm' },
          { name: 'Lengkuas', amount: '3 cm' },
          { name: 'Serai', amount: '2 batang' },
          { name: 'Daun jeruk', amount: '5 lembar' },
          { name: 'Daun kunyit', amount: '2 lembar' },
          { name: 'Kunyit', amount: '3 cm' },
          { name: 'Garam', amount: '1 sdt' },
          { name: 'Gula', amount: '1/2 sdt' },
          { name: 'Minyak goreng', amount: '3 sdm' }
        ],
        steps: [
          { step: 1, description: 'Potong daging sapi menjadi potongan kecil, kurang lebih 3x3 cm.' },
          { step: 2, description: 'Haluskan bawang merah, bawang putih, cabai keriting, cabai rawit, jahe, kunyit, dan lengkuas.' },
          { step: 3, description: 'Panaskan minyak goreng, tumis bumbu halus hingga harum.' },
          { step: 4, description: 'Masukkan serai, daun jeruk, dan daun kunyit. Tumis sebentar hingga layu.' },
          { step: 5, description: 'Masukkan potongan daging sapi, aduk rata dengan bumbu.' },
          { step: 6, description: 'Tuangkan santan kelapa, aduk perlahan.' },
          { step: 7, description: 'Masak dengan api kecil, aduk sesekali agar santan tidak pecah.' },
          { step: 8, description: 'Masak selama 2-3 jam hingga santan menyusut dan daging empuk.' },
          { step: 9, description: 'Tambahkan garam dan gula, koreksi rasa. Masak hingga rendang kering dan berminyak.' },
          { step: 10, description: 'Angkat dan sajikan rendang dengan nasi putih hangat.' }
        ],
        author: user._id,
        cookTime: '3 jam',
        servings: 4,
        likes: 89
      },
      {
        title: 'Soto Ayam Lamongan',
        description: 'Soto ayam Lamongan dengan kuah bening yang segar dan kaya rempah. Dilengkapi telur rebus, bihun, dan sambal khas.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Soto_ayam.JPG/960px-Soto_ayam.JPG',
        category: 'Makan Siang',
        ingredients: [
          { name: 'Ayam kampung', amount: '500 gram' },
          { name: 'Bawang merah', amount: '8 siung' },
          { name: 'Bawang putih', amount: '4 siung' },
          { name: 'Jahe', amount: '4 cm' },
          { name: 'Lengkuas', amount: '3 cm' },
          { name: 'Serai', amount: '3 batang' },
          { name: 'Daun jeruk', amount: '5 lembar' },
          { name: 'Kunyit', amount: '4 cm' },
          { name: 'Kemiri', amount: '4 butir' },
          { name: 'Bihun', amount: '100 gram' },
          { name: 'Telur', amount: '4 butir' },
          { name: 'Kol', amount: '200 gram' },
          { name: 'Daun bawang', amount: '3 batang' },
          { name: 'Bawang goreng', amount: 'secukupnya' },
          { name: 'Sambal', amount: 'secukupnya' },
          { name: 'Garam', amount: '1 sdt' },
          { name: 'Gula', amount: '1/2 sdt' }
        ],
        steps: [
          { step: 1, description: 'Rebus ayam dalam air mendidih, buang buih-buih yang muncul.' },
          { step: 2, description: 'Haluskan bawang merah, bawang putih, jahe, kunyit, dan kemiri.' },
          { step: 3, description: 'Tumis bumbu halus hingga harum, lalu masukkan ke dalam rebusan ayam.' },
          { step: 4, description: 'Tambahkan lengkuas, serai, dan daun jeruk. Masak hingga ayam matang.' },
          { step: 5, description: 'Angkat ayam, suwir-suwir dagingnya. Saring kuah soto.' },
          { step: 6, description: 'Rebus telur hingga matang, kupas dan belah dua.' },
          { step: 7, description: 'Rendam bihun dalam air panas hingga lembut.' },
          { step: 8, description: 'Potong kol tipis-tipis dan cuci bersih.' },
          { step: 9, description: 'Susun bihun, kol, suwiran ayam, dan telur dalam mangkuk.' },
          { step: 10, description: 'Siram dengan kuah soto panas, taburi bawang goreng dan daun bawang.' }
        ],
        author: user._id,
        cookTime: '45 menit',
        servings: 4,
        likes: 67
      },
      {
        title: 'Martabak Manis',
        description: 'Martabak manis tebal dengan topping kaya rasa. Adonan yang lembut dan fluffy dengan isisan coklat keju yang leleh.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Terang_Bulan_roasted_chicken.JPG/960px-Terang_Bulan_roasted_chicken.JPG',
        category: 'Cemilan',
        ingredients: [
          { name: 'Tepung terigu', amount: '250 gram' },
          { name: 'Gula pasir', amount: '50 gram' },
          { name: 'Ragi instant', amount: '1 sdt' },
          { name: 'Telur', amount: '2 butir' },
          { name: 'Susu cair', amount: '200 ml' },
          { name: 'Mentega', amount: '50 gram' },
          { name: 'Baking powder', amount: '1/2 sdt' },
          { name: 'Garam', amount: '1/4 sdt' },
          { name: 'Coklat meses', amount: '100 gram' },
          { name: 'Keju parut', amount: '100 gram' },
          { name: 'Kental manis', amount: '4 sdm' },
          { name: 'Mentega', amount: '30 gram (olesan)' }
        ],
        steps: [
          { step: 1, description: 'Campurkan tepung terigu, gula pasir, dan ragi instant dalam mangkuk besar.' },
          { step: 2, description: 'Masukkan telur dan susu cair sedikit demi sedikit sambil diaduk hingga rata.' },
          { step: 3, description: 'Tambahkan baking powder dan garam, aduk kembali hingga adonan halus.' },
          { step: 4, description: 'Diamkan adonan selama 1 jam hingga mengembang.' },
          { step: 5, description: 'Panaskan cetakan martabak dengan api kecil, olesi dengan mentega.' },
          { step: 6, description: 'Tuang adonan ke dalam cetakan, masak hingga permukaan berlubang-lubang kecil.' },
          { step: 7, description: 'Taburi gula pasir di atas adonan yang sudah setengah matang.' },
          { step: 8, description: 'Tutup cetakan, masak hingga matang sempurna.' },
          { step: 9, description: 'Angkat martabak, olesi dengan mentega selagi panas.' },
          { step: 10, description: 'Taburi coklat meses, keju parut, dan siram dengan kental manis.' },
          { step: 11, description: 'Lipat martabak menjadi dua, potong-potong dan sajikan.' }
        ],
        author: user._id,
        cookTime: '1.5 jam',
        servings: 4,
        likes: 52
      },
      {
        title: 'Puding Coklat',
        description: 'Puding coklat lembut dan creamy yang sangat mudah dibuat. Dessert sempurna untuk hidangan penutup yang disukai semua kalangan.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Puding_Coklat.jpg/960px-Puding_Coklat.jpg',
        category: 'Cemilan',
        ingredients: [
          { name: 'Susu cair', amount: '800 ml' },
          { name: 'Coklat bubuk', amount: '50 gram' },
          { name: 'Gula pasir', amount: '100 gram' },
          { name: 'Agar-agar bubuk', amount: '10 gram' },
          { name: 'Gelatin', amount: '5 gram' },
          { name: 'Mentega', amount: '30 gram' },
          { name: 'Vanili', amount: '1/2 sdt' },
          { name: 'Kuning telur', amount: '2 butir' },
          { name: 'Kental manis', amount: '200 ml' },
          { name: 'Coklat batang', amount: '50 gram (topping)' }
        ],
        steps: [
          { step: 1, description: 'Larutkan gelatin dalam 50 ml air dingin, diamkan 5 menit.' },
          { step: 2, description: 'Campurkan susu cair, coklat bubuk, gula pasir, dan agar-agar bubuk dalam panci.' },
          { step: 3, description: 'Panaskan dengan api sedang, aduk terus hingga mendidih.' },
          { step: 4, description: 'Ambil sedikit campuran susu, kocok dengan kuning telur, lalu tuang kembali ke panci.' },
          { step: 5, description: 'Masak dengan api kecil sambil diaduk terus hingga mengental.' },
          { step: 6, description: 'Masukkan gelatin yang sudah larut dan mentega, aduk hingga larut.' },
          { step: 7, description: 'Tambahkan kental manis dan vanili, aduk rata. Angkat dari api.' },
          { step: 8, description: 'Tuang adonan puding ke dalam cetakan, biarkan dingin di suhu ruangan.' },
          { step: 9, description: 'Masukkan ke dalam kulkas selama minimal 4 jam hingga set.' },
          { step: 10, description: 'Sajikan puding coklat dengan topping coklat batang yang dicairkan.' }
        ],
        author: user2._id,
        cookTime: '30 menit + 4 jam pendinginan',
        servings: 6,
        likes: 38
      },
      {
        title: 'Gado-gado Betawi',
        description: 'Gado-gado Betawi dengan bumbu kacang yang kental dan gurih. Campuran sayuran segar dengan tahu dan tempe goreng yang renyah.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Gado-gado_in_Jakarta.JPG/960px-Gado-gado_in_Jakarta.JPG',
        category: 'Makan Siang',
        ingredients: [
          { name: 'Kangkung', amount: '200 gram' },
          { name: 'Tauge', amount: '150 gram' },
          { name: 'Kol', amount: '200 gram' },
          { name: 'Ketimun', amount: '2 buah' },
          { name: 'Tahu goreng', amount: '4 potong' },
          { name: 'Tempe goreng', amount: '4 potong' },
          { name: 'Telur rebus', amount: '2 butir' },
          { name: 'Kacang tanah goreng', amount: '200 gram' },
          { name: 'Bawang merah', amount: '5 siung' },
          { name: 'Bawang putih', amount: '3 siung' },
          { name: 'Cabai merah', amount: '5 buah' },
          { name: 'Kecap manis', amount: '3 sdm' },
          { name: 'Asam jawa', amount: '1 sdm' },
          { name: 'Garam', amount: '1/2 sdt' },
          { name: 'Air', amount: '100 ml' },
          { name: 'Kerupuk', amount: 'secukupnya' }
        ],
        steps: [
          { step: 1, description: 'Rebus kangkung, tauge, dan kol hingga setengah matang. Tiriskan.' },
          { step: 2, description: 'Potong-potong ketimun, iris tahu dan tempe goreng.' },
          { step: 3, description: 'Belah telur rebus menjadi dua bagian.' },
          { step: 4, description: 'Haluskan kacang tanah goreng, bawang merah, bawang putih, dan cabai merah.' },
          { step: 5, description: 'Tambahkan air, kecap manis, asam jawa, dan garam, aduk hingga rata.' },
          { step: 6, description: 'Susun sayuran, tahu, tempe, dan telur rebus di atas piring.' },
          { step: 7, description: 'Siram dengan bumbu kacang yang sudah dibuat.' },
          { step: 8, description: 'Taburi dengan bawang goreng dan kerupuk di atasnya.' },
          { step: 9, description: 'Sajikan gado-gado sebagai makan siang yang segar dan bergizi.' }
        ],
        author: user2._id,
        cookTime: '25 menit',
        servings: 2,
        likes: 41
      }
    ]);

    console.log('Recipes created');

    // Create tutorials
    const tutorials = await Tutorial.insertMany([
      {
        title: 'Cara Membuat Nasi Goreng Spesial',
        description: 'Tutorial lengkap cara membuat nasi goreng spesial dari nol. Pelajari tips dan trik agar nasi gorengmu memiliki rasa yang lezat dan tekstur yang pas.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Cooking_fried_rice.jpg/960px-Cooking_fried_rice.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=VmBYmVVyzVw',
        duration: '15 menit',
        category: 'Sarapan',
        author: user._id
      },
      {
        title: 'Tips Memasak Rendang Padang Autentik',
        description: 'Kumpulan tips dan trik untuk memasak rendang yang autentik dan lezat. Dari pemilihan daging hingga teknik memasak yang benar.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Rendang_1.JPG/960px-Rendang_1.JPG',
        videoUrl: 'https://www.youtube.com/watch?v=qWdFYDBrT3I',
        duration: '20 menit',
        category: 'Makan Malam',
        author: user._id
      },
      {
        title: 'Resep Martabak Manis Anti Gagal',
        description: 'Belajar membuat martabak manis yang lembut dan mengembang sempurna. Termasuk rahasia adonan yang fluffy.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Giant_Apam_Balik.jpg/960px-Giant_Apam_Balik.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=Q94L98rwg8Y',
        duration: '25 menit',
        category: 'Cemilan',
        author: user2._id
      },
      {
        title: 'Resep Puding Coklat Simpel',
        description: 'Cara membuat puding coklat yang creamy dan lembut. Resep simpel yang bisa dicoba di rumah.',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop',
        videoUrl: 'https://www.youtube.com/watch?v=o2f4EkD1B9Q',
        duration: '12 menit',
        category: 'Cemilan',
        author: user2._id
      }
    ]);

    console.log('Tutorials created');

    // Create blogs
    const blogs = await Blog.insertMany([
      {
        title: '5 Tips Memasak untuk Pemula',
        content: `Memasak adalah skill yang sangat berharga untuk dimiliki, terutama bagi para pemula yang baru mulai belajar di dapur. Berikut adalah 5 tips yang bisa membantu kamu memulai perjalanan memasakmu:

1. Mulai dengan Resep yang Simpel
Jangan langsung mencoba resep yang rumit. Mulailah dengan resep sederhana seperti nasi goreng atau tumis sayur. Ini akan membangun kepercayaan diri kamu di dapur.

2. Siapkan Semua Bahan (Mise en Place)
Sebelum mulai memasak, siapkan semua bahan yang diperlukan. Potong, ukur, dan tata dengan rapi. Ini akan membuat proses memasak lebih lancar.

3. Kenali Bahan-Bahan Dasar
Pelajari berbagai jenis bumbu dan rempah yang umum digunakan dalam masakan Indonesia. Bawang merah, bawang putih, cabai, dan jahe adalah fondasi dari banyak masakan.

4. Jangan Takut Gagal
Setiap koki hebat pernah mengalami kegagalan. Anggap kegagalan sebagai pembelajaran untuk menjadi lebih baik.

5. Nikmati Prosesnya
Memasak seharusnya menyenangkan. Nikmati setiap langkah dan jangan terlalu memaksakan diri untuk sempurna.`,
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop',
        author: user._id,
        tags: ['tips', 'pemula', 'memasak']
      },
      {
        title: 'Manfaat Memasak di Rumah',
        content: `Memasak di rumah bukan hanya tentang membuat makanan. Ada banyak manfaat yang bisa didapatkan dari aktivitas ini:

1. Lebih Sehat dan Bergizi
Ketika kamu memasak sendiri, kamu bisa mengontrol kualitas bahan dan jumlah garam, gula, atau minyak yang digunakan. Makanan yang dimasak di rumah umumnya lebih sehat dibanding makanan instan.

2. Menghemat Pengeluaran
Biaya bahan mentah biasanya jauh lebih murah dibanding membeli makanan jadi. Dengan memasak di rumah, kamu bisa menghemat pengeluaran makanan hingga 50%.

3. Menjalin Kebersamaan Keluarga
Memasak bisa menjadi aktivitas yang menyenangkan bersama keluarga. Ajak anak-anak untuk membantu, ini bisa menjadi momen bonding yang berharga.

4. Mengurangi Sampah
Dengan memasak sendiri, kamu bisa mengurangi penggunaan kemasan plastik sekali pakai yang berkontribusi terhadap polusi lingkungan.

5. Menyalurkan Kreativitas
Dapur adalah studio kreatif kamu. Eksperimen dengan bahan dan bumbu berbeda untuk menciptakan kreasi baru yang unik.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Memasak_Rendang.jpg/960px-Memasak_Rendang.jpg',
        author: user._id,
        tags: ['tips', 'kesehatan', 'keluarga']
      },
      {
        title: 'Resep Sarapan Sehat untuk Keluarga',
        content: `Sarapan adalah waktu makan paling penting dalam sehari. Berikut beberapa resep sarapan sehat yang bisa kamu buat untuk keluarga:

**1. Oatmeal dengan Buah Segar**
Oatmeal kaya akan serat dan bisa diolah dengan berbagai topping. Tambahkan pisang, stroberi, madu, dan kacang-kacangan untuk sarapan yang bergizi.

**2. Telur Rebus dengan Sayuran**
Telur adalah sumber protein yang bagus. Rebus telur dan sajikan dengan salad segar atau sayuran kukus untuk sarapan cepat dan sehat.

**3. Smoothie Bowl**
Campurkan buah-buahan segar seperti pisang, berries, dan bayam dengan yogurt. Tambahkan granola dan madu sebagai topping.

**4. Roti Gandum dengan Alpukat**
Roti gandum yang diolesi alpukat tumbuk, ditambah telur mata sapi dan tomat, menjadi sarapan yang mengenyangkan dan bergizi.

**5. Bubur Ayam**
Bubur ayam hangat dengan ayam suwir, daun bawang, dan kerupuk adalah pilihan sarapan khas Indonesia yang menyehatkan.

Ingat, sarapan yang baik mengandung kombinasi protein, karbohidrat kompleks, dan lemak sehat.`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Nasi_Goreng_Breakfast_in_Solo.JPG/960px-Nasi_Goreng_Breakfast_in_Solo.JPG',
        author: user2._id,
        tags: ['resepsi', 'sarapan', 'kesehatan']
      },
      {
        title: 'Panduan Bumbu Dapur',
        content: `Mengenal bumbu dapur adalah langkah awal untuk menjadi koki yang handal. Berikut panduan lengkap bumbu-bumbu penting dalam dapur Indonesia:

**Bumbu Dasar:**
- Bawang Merah: Bumbu dasar hampir semua masakan Indonesia. Memberikan rasa manis dan aroma harum.
- Bawang Putih: Memberikan rasa gurih dan aroma kuat. Selalu gunakan dalam jumlah yang tepat.
- Cabai: Dari yang ringan hingga super pedas, cabai memberikan sensasi pedas pada masakan.

**Rempah-rempah:**
- Jahe: Memberikan rasa hangat dan aroma segar. Cocok untuk sup dan tumisan.
- Lengkuas: Aroma khas yang tidak bisa digantikan. Penting untuk rendang dan gulai.
- Kunyit: Memberikan warna kuning dan rasa khas. Penting untuk soto dan kari.
- Ketumbar: Biji yang dihaluskan menjadi bumbu dasar banyak masakan.

**Bahan Pelengkap:**
- Daun Jeruk: Aroma citrus yang segar untuk berbagai masakan.
- Serai: Aroma harum yang cocok untuk sup dan masakan berkuah.
- Kemiri: Memberikan rasa gurih dan tekstur kental pada bumbu.

**Tips Penyimpanan:**
- Simpan bumbu segar di dalam kulkas atau freezer.
- Bumbu kering sebaiknya disimpan dalam wadah kedap udara di tempat gelap.
- Giling bumbu sesuai kebutuhan untuk hasil terbaik.`,
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop',
        author: user._id,
        tags: ['bumbu', 'rempah', 'panduan']
      }
    ]);

    console.log('Blogs created');

    console.log('\n✓ Seed data created successfully!');
    console.log('  - 2 Users');
    console.log('  - 4 Categories');
    console.log('  - 6 Recipes');
    console.log('  - 4 Tutorials');
    console.log('  - 4 Blogs');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
