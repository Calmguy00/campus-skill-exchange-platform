import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  getCurrentUser,
  getIncomingRequests,
  getSentRequests,
  getUserById,
  getSkillById,
  updateRequestStatus,
  type Request,
} from "../utils/storage";
import { toast } from "sonner";
import { Inbox, Send, Check, X, Clock } from "lucide-react";

export function RequestsPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [incomingRequests, setIncomingRequests] = useState<Request[]>([]);
  const [sentRequests, setSentRequests] = useState<Request[]>([]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    loadRequests();
  }, [currentUser, navigate]);

  const loadRequests = () => {
    if (currentUser) {
      setIncomingRequests(getIncomingRequests(currentUser.user_id));
      setSentRequests(getSentRequests(currentUser.user_id));
    }
  };

  const handleAccept = (requestId: number) => {
    const result = updateRequestStatus(requestId, 'Accepted');
    if (result.success) {
      toast.success('Request accepted!');
      loadRequests();
    } else {
      toast.error(result.message);
    }
  };

  const handleReject = (requestId: number) => {
    const result = updateRequestStatus(requestId, 'Rejected');
    if (result.success) {
      toast.success('Request rejected');
      loadRequests();
    } else {
      toast.error(result.message);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Pending') {
      return <Badge className="border border-yellow-200 bg-yellow-100 text-yellow-700"><Clock className="mr-1 h-3 w-3" />Pending</Badge>;
    }

    if (status === 'Accepted') {
      return <Badge className="border border-green-200 bg-green-100 text-green-700"><Check className="mr-1 h-3 w-3" />Accepted</Badge>;
    }

    return <Badge className="border border-red-200 bg-red-100 text-red-700"><X className="mr-1 h-3 w-3" />Rejected</Badge>;
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="animate-fade-up min-h-[calc(100vh-5rem)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Community</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Skill requests</h1>
          </div>
        </div>

        <Tabs defaultValue="incoming" className="w-full">
          <TabsList className="mb-8 grid w-full max-w-lg grid-cols-2 rounded-full border border-blue-100 bg-white/80 p-1 shadow-sm">
            <TabsTrigger value="incoming" className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              <Inbox className="mr-2 h-4 w-4" />
              Incoming ({incomingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="sent" className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              <Send className="mr-2 h-4 w-4" />
              Sent ({sentRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="incoming">
            {incomingRequests.length === 0 ? (
              <Card className="border border-blue-100 bg-white/80 shadow-[0_18px_45px_rgba(59,130,246,0.06)]">
                <CardContent className="p-12 text-center">
                  <Inbox className="mx-auto mb-4 h-12 w-12 text-blue-300" />
                  <p className="text-slate-600">No incoming requests yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {incomingRequests.map((request) => {
                  const sender = getUserById(request.sender_id);
                  const skill = getSkillById(request.skill_id);

                  return (
                    <Card key={request.request_id} className="border border-blue-100 bg-white/80 shadow-[0_18px_45px_rgba(59,130,246,0.06)] transition-transform duration-200 hover:-translate-y-0.5">
                      <CardHeader>
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="mb-2 text-xl font-semibold text-slate-900">
                              Request for: {skill?.skill_name}
                            </CardTitle>
                            <div className="space-y-1 text-sm text-slate-600">
                              <p>From: <span className="font-medium text-slate-800">{sender?.name}</span></p>
                              <p>Department: {sender?.department} (Year {sender?.year})</p>
                              <p>Email: {sender?.email}</p>
                            </div>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="mb-4 rounded-2xl bg-blue-50 p-4">
                          <p className="text-sm leading-6 text-slate-700">
                            <span className="font-semibold text-slate-900">Skill description:</span> {skill?.description}
                          </p>
                        </div>

                        {request.status === 'Pending' && (
                          <div className="flex flex-col gap-3 sm:flex-row">
                            <Button onClick={() => handleAccept(request.request_id)} className="flex-1 rounded-xl bg-green-600 text-white hover:bg-green-700">
                              <Check className="mr-2 h-4 w-4" />
                              Accept
                            </Button>
                            <Button onClick={() => handleReject(request.request_id)} variant="outline" className="flex-1 rounded-xl border-red-200 text-red-700 hover:bg-red-50">
                              <X className="mr-2 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sent">
            {sentRequests.length === 0 ? (
              <Card className="border border-blue-100 bg-white/80 shadow-[0_18px_45px_rgba(59,130,246,0.06)]">
                <CardContent className="p-12 text-center">
                  <Send className="mx-auto mb-4 h-12 w-12 text-blue-300" />
                  <p className="text-slate-600">You haven’t sent any requests yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {sentRequests.map((request) => {
                  const receiver = getUserById(request.receiver_id);
                  const skill = getSkillById(request.skill_id);

                  return (
                    <Card key={request.request_id} className="border border-blue-100 bg-white/80 shadow-[0_18px_45px_rgba(59,130,246,0.06)] transition-transform duration-200 hover:-translate-y-0.5">
                      <CardHeader>
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="mb-2 text-xl font-semibold text-slate-900">
                              Request for: {skill?.skill_name}
                            </CardTitle>
                            <div className="space-y-1 text-sm text-slate-600">
                              <p>To: <span className="font-medium text-slate-800">{receiver?.name}</span></p>
                              <p>Department: {receiver?.department} (Year {receiver?.year})</p>
                              <p>Email: {receiver?.email}</p>
                            </div>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="rounded-2xl bg-blue-50 p-4">
                          <p className="text-sm leading-6 text-slate-700">
                            <span className="font-semibold text-slate-900">Skill description:</span> {skill?.description}
                          </p>
                        </div>

                        {request.status === 'Accepted' && (
                          <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4">
                            <p className="text-sm text-green-800">
                              🎉 Your request was accepted! You can reach out to {receiver?.name} at {receiver?.email}.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
