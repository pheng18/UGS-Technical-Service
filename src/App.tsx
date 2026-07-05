import React, { useState, useEffect } from "react";
import { 
  auth, 
  db, 
  onAuthStateChanged, 
  signOut,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  where
} from "./firebase";
import { User } from "./firebase";
import { Repair, Project, CORSStation, Quotation, InternalNote } from "./types";
import { 
  initialRepairs, 
  initialProjects, 
  initialCORSStations, 
  initialQuotations, 
  initialNotes 
} from "./seedData";

// Components
import Sidebar, { ViewType } from "./components/Sidebar";
import Header from "./components/Header";
import LoginScreen from "./components/LoginScreen";
import DashboardView from "./components/DashboardView";
import RepairsView from "./components/RepairsView";
import ProjectsView from "./components/ProjectsView";
import CorsView from "./components/CorsView";
import QuotationsView from "./components/QuotationsView";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  // Firestore & local state sync
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [corsStations, setCorsStations] = useState<CORSStation[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [notes, setNotes] = useState<InternalNote[]>([]);

  // Detailed selected targets
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);

  // Monitor Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser as User);
      } else {
        setUser(null);
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  // Sync data with Firestore when user is logged in
  useEffect(() => {
    if (!user) return;

    const setupFirestoreData = async () => {
      try {
        // 1. REPAIRS
        const repairsSnap = await getDocs(collection(db, "repairs"));
        if (repairsSnap.empty) {
          // Seed initial data
          for (const rep of initialRepairs) {
            await setDoc(doc(db, "repairs", rep.id), rep);
          }
        }
        
        // 2. PROJECTS
        const projectsSnap = await getDocs(collection(db, "projects"));
        if (projectsSnap.empty) {
          for (const prj of initialProjects) {
            await setDoc(doc(db, "projects", prj.id), prj);
          }
        }

        // 3. CORS STATIONS
        const corsSnap = await getDocs(collection(db, "cors_stations"));
        if (corsSnap.empty) {
          for (const st of initialCORSStations) {
            await setDoc(doc(db, "cors_stations", st.id), st);
          }
        }

        // 4. QUOTATIONS
        const quoteSnap = await getDocs(collection(db, "quotations"));
        if (quoteSnap.empty) {
          for (const quote of initialQuotations) {
            await setDoc(doc(db, "quotations", quote.id), quote);
          }
        }

        // 5. NOTES
        const notesSnap = await getDocs(collection(db, "notes"));
        if (notesSnap.empty) {
          for (const note of initialNotes) {
            await setDoc(doc(db, "notes", note.id), note);
          }
        }
      } catch (err) {
        console.warn("Firestore auto-seed skipped or has restriction (fallback to offline state):", err);
      }
    };

    setupFirestoreData();

    // Setup Firestore Listeners
    const unsubRepairs = onSnapshot(collection(db, "repairs"), (snap) => {
      const list: Repair[] = [];
      snap.forEach((docSnap) => {
        list.push({ ...docSnap.data(), id: docSnap.id } as Repair);
      });
      setRepairs(list.length > 0 ? list : initialRepairs);
    }, (error) => {
      console.warn("Using offline fallback repairs:", error);
      setRepairs(initialRepairs);
    });

    const unsubProjects = onSnapshot(collection(db, "projects"), (snap) => {
      const list: Project[] = [];
      snap.forEach((docSnap) => {
        list.push({ ...docSnap.data(), id: docSnap.id } as Project);
      });
      setProjects(list.length > 0 ? list : initialProjects);
    }, (error) => {
      console.warn("Using offline fallback projects:", error);
      setProjects(initialProjects);
    });

    const unsubCors = onSnapshot(collection(db, "cors_stations"), (snap) => {
      const list: CORSStation[] = [];
      snap.forEach((docSnap) => {
        list.push({ ...docSnap.data(), id: docSnap.id } as CORSStation);
      });
      setCorsStations(list.length > 0 ? list : initialCORSStations);
    }, (error) => {
      console.warn("Using offline fallback CORS:", error);
      setCorsStations(initialCORSStations);
    });

    const unsubQuotes = onSnapshot(collection(db, "quotations"), (snap) => {
      const list: Quotation[] = [];
      snap.forEach((docSnap) => {
        list.push({ ...docSnap.data(), id: docSnap.id } as Quotation);
      });
      setQuotations(list.length > 0 ? list : initialQuotations);
    }, (error) => {
      console.warn("Using offline fallback quotations:", error);
      setQuotations(initialQuotations);
    });

    const unsubNotes = onSnapshot(collection(db, "notes"), (snap) => {
      const list: InternalNote[] = [];
      snap.forEach((docSnap) => {
        list.push({ ...docSnap.data(), id: docSnap.id } as InternalNote);
      });
      setNotes(list.length > 0 ? list : initialNotes);
    }, (error) => {
      console.warn("Using offline fallback notes:", error);
      setNotes(initialNotes);
    });

    return () => {
      unsubRepairs();
      unsubProjects();
      unsubCors();
      unsubQuotes();
      unsubNotes();
    };
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error(err);
      // Fallback
      setUser(null);
    }
  };

  const handleAddNote = async (repairId: string, text: string) => {
    const authorName = user?.displayName || user?.email || "ຊ່າງເຕັກນິກ Uniqtek";
    const newNote: InternalNote = {
      id: "note_" + Date.now(),
      repairId,
      author: authorName,
      date: new Date().toLocaleDateString("en-GB") + " " + new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      text
    };

    try {
      await setDoc(doc(db, "notes", newNote.id), newNote);
    } catch (err) {
      console.warn("Saving note to offline local fallback state:", err);
      setNotes(prev => [newNote, ...prev]);
    }
  };

  const handleAddRepair = async (repairData: Omit<Repair, "id">) => {
    const id = "REP-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
    const newRepair: Repair = {
      ...repairData,
      id
    };

    try {
      await setDoc(doc(db, "repairs", id), newRepair);
    } catch (err) {
      console.warn("Saving repair to offline local fallback state:", err);
      setRepairs(prev => [newRepair, ...prev]);
    }
  };

  const handleAddProject = async (projectData: Omit<Project, "id">) => {
    const id = "PRJ-" + Math.floor(100 + Math.random() * 900);
    const newProject: Project = {
      ...projectData,
      id
    };

    try {
      await setDoc(doc(db, "projects", id), newProject);
    } catch (err) {
      console.warn("Saving project to offline local fallback state:", err);
      setProjects(prev => [newProject, ...prev]);
    }
  };

  const handleAddQuotation = async (quotationData: Omit<Quotation, "id">) => {
    const id = "QT-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
    const newQuotation: Quotation = {
      ...quotationData,
      id
    };

    try {
      await setDoc(doc(db, "quotations", id), newQuotation);
      setSelectedQuotation(newQuotation);
    } catch (err) {
      console.warn("Saving quotation to offline local fallback state:", err);
      setQuotations(prev => [newQuotation, ...prev]);
      setSelectedQuotation(newQuotation);
    }
  };

  const handleUpdateStationNotes = async (id: string, updatedNotes: string) => {
    try {
      const docRef = doc(db, "cors_stations", id);
      await updateDoc(docRef, { notes: updatedNotes });
    } catch (err) {
      console.warn("Updating CORS offline local fallback state:", err);
      setCorsStations(prev => prev.map(s => s.id === id ? { ...s, notes: updatedNotes } : s));
    }
  };

  const handleToggleStationStatus = async (id: string) => {
    const currentStation = corsStations.find(s => s.id === id);
    if (!currentStation) return;
    const nextStatus = currentStation.status === "Online" ? "Offline" : "Online";

    try {
      const docRef = doc(db, "cors_stations", id);
      await updateDoc(docRef, { status: nextStatus });
    } catch (err) {
      console.warn("Updating CORS offline status:", err);
      setCorsStations(prev => prev.map(s => s.id === id ? { ...s, status: nextStatus } : s));
    }
  };

  // Navigations & Views dispatcher
  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    setSelectedRepair(null);
    setSelectedProject(null);
    setSelectedQuotation(null);
  };

  const handleViewRepairDetail = (rep: Repair | null) => {
    setSelectedRepair(rep);
    setCurrentView("repairs");
  };

  const handleViewProjectDetail = (proj: Project | null) => {
    setSelectedProject(proj);
    setCurrentView("projects");
  };

  const handleViewQuotationDetail = (quote: Quotation | null) => {
    setSelectedQuotation(quote);
    setCurrentView("quotations");
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-bold text-primary font-sans">ກຳລັງກວດສອບສິດເຂົ້າໃຊ້...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLoginSuccess={(u) => setUser(u)} />;
  }

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans antialiased flex">
      {/* Fixed Sidebar */}
      <Sidebar 
        currentView={currentView}
        onViewChange={handleViewChange}
        onLogout={handleLogout}
        onNewQuotation={() => {
          setSelectedQuotation(null);
          setCurrentView("quotations");
        }}
        onNewRepair={() => {
          setSelectedRepair(null);
          setCurrentView("repairs");
        }}
      />

      {/* Main Panel Content Area */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        <Header 
          user={user}
          onLogout={handleLogout}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder={
            currentView === "repairs" ? "ຄົ້ນຫາເລກ REP, Model, ຫຼື ຊື່ລູກຄ້າ..." :
            currentView === "projects" ? "ຄົ້ນຫາຊື່ໂຄງການ, ສະຖານທີ່..." :
            currentView === "cors" ? "ຄົ້ນຫາລະຫັດ CORS ຫຼື ຊື່ແຂວງ..." :
            currentView === "quotations" ? "ຄົ້ນຫາເລກ QT ຫຼື ຊື່ລູກຄ້າ..." :
            "ຄົ້ນຫາອຸປະກອນ ຫຼື ເລກລະຫັດ..."
          }
        />

        <main className="flex-1 p-8 max-w-7xl w-full mx-auto pb-16">
          {currentView === "dashboard" && (
            <DashboardView 
              repairs={repairs}
              projects={projects}
              onViewAllRepairs={() => handleViewChange("repairs")}
              onViewProject={handleViewProjectDetail}
            />
          )}

          {currentView === "repairs" && (
            <RepairsView 
              repairs={repairs}
              selectedRepair={selectedRepair}
              onSelectRepair={setSelectedRepair}
              notes={notes}
              onAddNote={handleAddNote}
              onAddRepair={handleAddRepair}
              searchTerm={searchTerm}
            />
          )}

          {currentView === "projects" && (
            <ProjectsView 
              projects={projects}
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
              onAddProject={handleAddProject}
            />
          )}

          {currentView === "cors" && (
            <CorsView 
              stations={corsStations}
              onUpdateStationNotes={handleUpdateStationNotes}
              onToggleStationStatus={handleToggleStationStatus}
            />
          )}

          {currentView === "quotations" && (
            <QuotationsView 
              quotations={quotations}
              selectedQuotation={selectedQuotation}
              onSelectQuotation={setSelectedQuotation}
              onAddQuotation={handleAddQuotation}
            />
          )}
        </main>
      </div>
    </div>
  );
}
