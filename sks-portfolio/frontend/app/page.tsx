import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import AdminLoginTrigger from '@/components/admin/AdminLoginTrigger';

export const dynamic = 'force-dynamic';

async function getData() {
  const headers = { 'x-internal-token': process.env.INTERNAL_SECRET_TOKEN || 'this_is_a_shared_secret_for_proxy' };
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  try {
    const [settingsRes, servicesRes, projectsRes] = await Promise.all([
      fetch(`${baseUrl}/api/settings`, { cache: 'no-store', headers }).catch(() => null),
      fetch(`${baseUrl}/api/services`, { cache: 'no-store', headers }).catch(() => null),
      fetch(`${baseUrl}/api/projects`, { cache: 'no-store', headers }).catch(() => null)
    ]);

    return {
      settings: settingsRes && settingsRes.ok ? await settingsRes.json() : null,
      services: servicesRes && servicesRes.ok ? await servicesRes.json() : [],
      projects: projectsRes && projectsRes.ok ? await projectsRes.json() : []
    };
  } catch (error) {
    console.error("Failed to fetch page data", error);
    return { settings: null, services: [], projects: [] };
  }
}

export default async function Home() {
  const { settings, services, projects } = await getData();

  const visibleServices = services.filter((s: any) => s.visible !== false);
  const visibleProjects = projects;

  return (
    <main className="min-h-screen bg-[var(--bg-base)] selection:bg-[var(--primary-accent)] selection:text-black">
      <Navbar />
      <Hero settings={settings} />
      <Services services={visibleServices} />
      <Portfolio projects={visibleProjects} />
      <About settings={settings} />
      <Contact settings={settings} services={visibleServices} />
      <Footer settings={settings} />
      <AdminLoginTrigger />
    </main>
  );
}
