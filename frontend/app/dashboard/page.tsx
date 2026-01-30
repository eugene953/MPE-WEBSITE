'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Dashboard() {
    const { t } = useLanguage();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('quotes');
    const [activeProjectStatus, setActiveProjectStatus] = useState('all');
    const [quotes, setQuotes] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [contracts, setContracts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [showCounterInput, setShowCounterInput] = useState(false);
    const [counterPrice, setCounterPrice] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendCounter = async () => {
        if (!counterPrice || !selectedQuoteId) return;
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:6000/quotes/${selectedQuoteId}/proposal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ price: Number(counterPrice), message: `Contre-proposition client pour ${counterPrice} FCFA` })
        });
        if (res.ok) {
            setCounterPrice('');
            setShowCounterInput(false);
            fetchMessages(selectedQuoteId);
            // Also update the quote status in local state if possible or reload
            window.location.reload();
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const [quotesRes, projectsRes, contractsRes] = await Promise.all([
                    fetch('http://localhost:6000/quotes', { headers }),
                    fetch('http://localhost:6000/projects', { headers }),
                    fetch('http://localhost:6000/contracts', { headers })
                ]);

                if (quotesRes.ok) setQuotes(await quotesRes.json());
                if (projectsRes.ok) setProjects(await projectsRes.json());
                if (contractsRes.ok) setContracts(await contractsRes.json());
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    const fetchMessages = async (quoteId: string) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:6000/messages/${quoteId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) setMessages(await res.json());
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedQuoteId) return;
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:6000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ quoteId: selectedQuoteId, content: newMessage })
        });
        if (res.ok) {
            setNewMessage('');
            fetchMessages(selectedQuoteId);
        }
    };

    const updateQuoteStatus = async (quoteId: string, status: string) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:6000/quotes/${quoteId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });
        if (res.ok) window.location.reload();
    };

    const handleSignContract = async (contractId: string) => {
        const signature = prompt('Veuillez saisir votre nom pour signer le contrat :');
        if (!signature) return;

        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:6000/contracts/${contractId}/sign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ signature })
        });
        if (res.ok) window.location.reload();
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    // Filter logic
    const filteredProjects = activeProjectStatus === 'all'
        ? projects
        : projects.filter(p => p.status === activeProjectStatus);

    const pendingAction = contracts.some(c => c.status === 'pending_signature')
        || quotes.some(q => q.status === 'validated' || q.status === 'negotiating');

    const paymentNotice = contracts.some(c => c.status === 'signed');

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                {/* Notification: Action Pending */}
                {pendingAction && (
                    <div className="sticky top-24 z-40 bg-red-600 text-white p-4 mb-6 rounded-xl shadow-2xl animate-fade-in flex justify-between items-center border-l-8 border-red-800">
                        <div className="flex items-center gap-4">
                            <span className="text-3xl">🔔</span>
                            <div>
                                <p className="font-bold text-lg uppercase tracking-wider">Action en Attente</p>
                                <p className="text-red-100">Vous avez des éléments nécessitant votre attention immédiate.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                if (contracts.some(c => c.status === 'pending_signature')) setActiveTab('contracts');
                                else setActiveTab('quotes');
                            }}
                            className="bg-white text-red-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition shadow-md"
                        >
                            Voir les Actions
                        </button>
                    </div>
                )}

                {/* Notification: Payment */}
                {paymentNotice && (
                    <div className="bg-orange-500 text-white p-4 mb-6 rounded-xl shadow-xl flex justify-between items-center border-l-8 border-orange-700">
                        <div className="flex items-center gap-4">
                            <span className="text-3xl">💰</span>
                            <div>
                                <p className="font-bold text-lg">Paiement Requis</p>
                                <p className="text-orange-100">Veuillez procéder au paiement ou vous rendre dans nos locaux : Nkoabang ou Cité des Palmiers.</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-bold">Payer en ligne</button>
                            <button className="bg-orange-700 text-white px-4 py-2 rounded-lg font-bold">Sur place</button>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{t('nav.dashboard')}</h1>
                    <button
                        onClick={() => router.push('/request-quote')}
                        className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                        <span>+ Nouveau Projet</span>
                    </button>
                </div>

                {/* Main Tabs */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('quotes')}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'quotes' ? 'bg-[#0066cc] text-white shadow-lg scale-105' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        Total Quotes ({quotes.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'projects' ? 'bg-[#0066cc] text-white shadow-lg scale-105' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        My Projects
                    </button>
                    <button
                        onClick={() => setActiveTab('contracts')}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'contracts' ? 'bg-[#0066cc] text-white shadow-lg scale-105' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        My Contracts & Documents
                    </button>
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-xl shadow-sm p-6 min-h-[400px]">
                    {activeTab === 'quotes' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-6 gradient-text">Total des Devis ({quotes.length})</h2>
                            {quotes.length === 0 ? (
                                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                    <div className="text-6xl mb-4">🚀</div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Prêt à lancer votre projet ?</h3>
                                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                        Vous n'avez pas encore de devis. Commencez par nous parler de votre projet pour obtenir une estimation personnalisée.
                                    </p>
                                    <button
                                        onClick={() => router.push('/request-quote')}
                                        className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover-scale"
                                    >
                                        Déposer mon premier projet
                                    </button>
                                </div>
                            ) : (
                                <div className="grid gap-6">
                                    {quotes.map((quote: any) => (
                                        <div key={quote._id} className="border-2 border-gray-100 p-6 rounded-2xl hover:border-blue-100 hover:shadow-md transition bg-gradient-to-r from-white to-gray-50">
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                                <div>
                                                    <h3 className="font-bold text-xl text-gray-800 uppercase">{quote.projectTitle}</h3>
                                                    <p className="text-sm text-gray-500 mb-2">Demandé le {new Date(quote.createdAt).toLocaleDateString()}</p>
                                                    <div className="flex gap-2">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase ${quote.status === 'validated' ? 'bg-green-100 text-green-700' :
                                                            quote.status === 'negotiating' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                                            }`}>
                                                            {quote.status}
                                                        </span>
                                                        {quote.price && <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold">{quote.price} FCFA</span>}
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {quote.status === 'validated' && (
                                                        <>
                                                            <button onClick={() => updateQuoteStatus(quote._id, 'accepted')} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition">Accepter</button>
                                                            <button onClick={() => updateQuoteStatus(quote._id, 'refused')} className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition">Refuser</button>
                                                        </>
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            setSelectedQuoteId(quote._id);
                                                            fetchMessages(quote._id);
                                                            setShowChat(true);
                                                        }}
                                                        className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg font-bold hover:bg-blue-100 transition"
                                                    >
                                                        Discuter / Négocier 💬
                                                    </button>
                                                </div>
                                            </div>
                                            {quote.proposals?.length > 0 && (
                                                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                                                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Dernière proposition</p>
                                                    <p className="text-sm">Prix : <span className="font-bold">{quote.proposals[quote.proposals.length - 1].price} FCFA</span></p>
                                                    <p className="text-sm italic">"{quote.proposals[quote.proposals.length - 1].message}"</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 gradient-text">Mes Projets</h2>
                            {/* Project Sub-tabs as explicit buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                {[
                                    { id: 'awaiting_validation', label: 'En attente de validation', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
                                    { id: 'in_progress', label: 'En cours d\'exécution', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                                    { id: 'completed', label: 'Projets terminés', color: 'bg-green-50 text-green-700 border-green-200' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveProjectStatus(tab.id)}
                                        className={`p-6 rounded-2xl border-2 font-bold text-lg transition-all ${activeProjectStatus === tab.id
                                            ? `${tab.color.replace('50', '100')} ring-4 ring-offset-2 ring-blue-500`
                                            : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-4">
                                {filteredProjects.length === 0 ? (
                                    <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                        <p className="text-gray-400 text-lg">Aucun projet dans cette catégorie.</p>
                                    </div>
                                ) : (
                                    filteredProjects.map((project: any) => (
                                        <div key={project._id} className="border-2 border-gray-100 p-6 rounded-2xl hover:border-blue-100 transition shadow-sm bg-white">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-bold text-xl uppercase">{project.title}</h3>
                                                <span className="px-4 py-1 bg-gray-800 text-white rounded-full text-xs font-bold uppercase tracking-widest">{project.status}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'contracts' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-6 gradient-text">Mes Contrats et Documents</h2>
                            {contracts.length === 0 ? <p className="text-gray-500">Aucun document trouvé.</p> : (
                                <div className="grid gap-6">
                                    {contracts.map((contract: any) => (
                                        <div key={contract._id} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 p-6 rounded-2xl border-2 border-gray-100 border-l-[12px] border-l-blue-600">
                                            <div>
                                                <h4 className="font-bold text-lg uppercase">CONTRAT - {contract.project?.title || 'PROJET MPE'}</h4>
                                                <p className="text-sm text-gray-500 italic">Dernière mise à jour : {new Date(contract.updatedAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="mt-4 md:mt-0">
                                                {contract.status === 'pending_signature' ? (
                                                    <button
                                                        onClick={() => handleSignContract(contract._id)}
                                                        className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg flex items-center gap-2"
                                                    >
                                                        <span>Signer le Contrat</span>
                                                        <span className="text-2xl">✍️</span>
                                                    </button>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-6 py-2 rounded-full border border-green-200">
                                                        <span>Signé</span>
                                                        <span className="text-xl">✓</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* Chat Modal Overlay */}
            {showChat && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[80vh] animate-pop-in">
                        <div className="bg-gradient-to-r from-[#0066cc] to-[#00a651] p-6 text-white flex justify-between items-center">
                            <div>
                                <h2 className="font-black text-xl uppercase tracking-tighter">Négociation & Messagerie</h2>
                                <p className="text-sm opacity-80">En direct avec l'équipe MPE</p>
                            </div>
                            <button onClick={() => setShowChat(false)} className="text-3xl hover:rotate-90 transition-transform">&times;</button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50">
                            {messages.map((msg: any) => (
                                <div key={msg._id} className={`flex ${msg.sender.role === 'client' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.sender.role === 'client'
                                        ? 'bg-[#0066cc] text-white rounded-tr-none'
                                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                        }`}>
                                        <p className="text-xs opacity-60 mb-1 font-bold">{msg.sender.firstName} ({msg.sender.role})</p>
                                        <p>{msg.content}</p>
                                        <p className="text-[10px] opacity-40 mt-1 text-right">{new Date(msg.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 bg-white border-t space-y-4">
                            {showCounterInput ? (
                                <div className="space-y-4 animate-slide-up">
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            value={counterPrice}
                                            onChange={(e) => setCounterPrice(e.target.value)}
                                            placeholder="Nouveau prix proposé (FCFA)..."
                                            className="flex-grow px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            onClick={handleSendCounter}
                                            className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700"
                                        >
                                            Proposer
                                        </button>
                                        <button
                                            onClick={() => setShowCounterInput(false)}
                                            className="bg-gray-100 text-gray-500 px-4 py-3 rounded-xl font-bold"
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                    <p className="text-xs text-blue-600 font-medium">⚠️ Cela mettra à jour le statut du devis en "Négociation".</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Posez votre question ou discutez du projet..."
                                            className="flex-grow px-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="bg-[#0066cc] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700"
                                        >
                                            Envoyer
                                        </button>
                                    </div>
                                    <div className="flex gap-2 justify-center border-t pt-4">
                                        <button
                                            onClick={() => setShowCounterInput(true)}
                                            className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-widest"
                                        >
                                            Faire une contre-proposition de prix 🏷️
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
