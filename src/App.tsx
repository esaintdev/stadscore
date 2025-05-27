
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Index from "./pages/Index";
import Basketball from "./pages/Basketball";
import Tennis from "./pages/Tennis";
import Handball from "./pages/Handball";
import Contact from "./pages/Contact";

import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import LeagueTable from "./components/leagues/LeagueTable";
import SportsPage from "./pages/SportsPage";
import Result from "./pages/Result";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Baseball from "./pages/Baseball";
import Volleyball from "./pages/Volleyball";
import Cricket from "./pages/Cricket";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            {/* <Route path="/fixtures" element={<Fixtures />} /> */}
            <Route path="/basketball" element={<Basketball />} />
            <Route path="/tennis" element={<Tennis />} />
            <Route path="/results" element={<Result />} />
            <Route path="/handball" element={<Handball />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/baseball" element={<Baseball />} />
            <Route path="/volleyball" element={<Volleyball />} />
            <Route path="/cricket" element={<Cricket />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/blog/category/:category" element={<BlogPage />} />
            <Route path="/league-tables" element={<LeagueTable />} />
            <Route path="/league-tables/:leagueId" element={<LeagueTable />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="/sports/:sportId" element={<SportsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
