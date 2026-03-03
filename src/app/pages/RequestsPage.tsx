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
  type Request 
} from "../utils/storage";
import { toast } from "sonner";
import { Inbox, Send, Check, X, Clock } from "lucide-react";

export function RequestsPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [incomingRequests, setIncomingRequests] = useState<Request[]>([]);
  const [sentRequests, setSentRequests] = useState<Request[]>([]);

  useEffect(() => {
    // Redirect if not logged in
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
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    } else if (status === 'Accepted') {
      return <Badge className="bg-green-100 text-green-700 border-green-300"><Check className="w-3 h-3 mr-1" />Accepted</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-700 border-red-300"><X className="w-3 h-3 mr-1" />Rejected</Badge>;
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl text-blue-900 mb-8">Skill Requests</h1>

        <Tabs defaultValue="incoming" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="incoming" className="flex items-center gap-2">
              <Inbox className="w-4 h-4" />
              Incoming ({incomingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="sent" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Sent ({sentRequests.length})
            </TabsTrigger>
          </TabsList>

          {/* Incoming Requests Tab */}
          <TabsContent value="incoming">
            {incomingRequests.length === 0 ? (
              <Card className="border-blue-100">
                <CardContent className="p-12 text-center">
                  <Inbox className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                  <p className="text-gray-600">No incoming requests yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {incomingRequests.map((request) => {
                  const sender = getUserById(request.sender_id);
                  const skill = getSkillById(request.skill_id);
                  
                  return (
                    <Card key={request.request_id} className="border-blue-100 hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-blue-900 mb-2">
                              Request for: {skill?.skill_name}
                            </CardTitle>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>From: <span className="font-medium">{sender?.name}</span></p>
                              <p>Department: {sender?.department} (Year {sender?.year})</p>
                              <p>Email: {sender?.email}</p>
                            </div>
                          </div>
                          <div>
                            {getStatusBadge(request.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Skill Description:</span> {skill?.description}
                          </p>
                        </div>
                        {request.status === 'Pending' && (
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handleAccept(request.request_id)}
                              className="bg-green-600 hover:bg-green-700 flex-1"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Accept
                            </Button>
                            <Button 
                              onClick={() => handleReject(request.request_id)}
                              variant="outline"
                              className="border-red-300 text-red-700 hover:bg-red-50 flex-1"
                            >
                              <X className="w-4 h-4 mr-2" />
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

          {/* Sent Requests Tab */}
          <TabsContent value="sent">
            {sentRequests.length === 0 ? (
              <Card className="border-blue-100">
                <CardContent className="p-12 text-center">
                  <Send className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                  <p className="text-gray-600">You haven't sent any requests yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {sentRequests.map((request) => {
                  const receiver = getUserById(request.receiver_id);
                  const skill = getSkillById(request.skill_id);
                  
                  return (
                    <Card key={request.request_id} className="border-blue-100 hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-blue-900 mb-2">
                              Request for: {skill?.skill_name}
                            </CardTitle>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>To: <span className="font-medium">{receiver?.name}</span></p>
                              <p>Department: {receiver?.department} (Year {receiver?.year})</p>
                              <p>Email: {receiver?.email}</p>
                            </div>
                          </div>
                          <div>
                            {getStatusBadge(request.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Skill Description:</span> {skill?.description}
                          </p>
                        </div>
                        {request.status === 'Accepted' && (
                          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-800">
                              🎉 Your request has been accepted! You can reach out to {receiver?.name} at {receiver?.email}
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
