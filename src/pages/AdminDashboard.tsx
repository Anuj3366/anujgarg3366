import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { LogOut, Mail, Calendar, User, MessageSquare, Eye, Archive } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'archived';
  created_at: string;
  ip_address: string | null;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    checkAuth();
    fetchSubmissions();

    // Set up realtime subscription
    const channel = supabase
      .channel('contact-submissions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_submissions'
        },
        () => {
          fetchSubmissions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/admin');
      return;
    }

    setUser(session.user);
  };

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSubmissions((data as ContactSubmission[]) || []);
    } catch (error: any) {
      toast.error('Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const updateStatus = async (id: string, status: 'new' | 'read' | 'archived') => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Status updated to ${status}`);
      fetchSubmissions();
    } catch (error: any) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-primary text-primary-foreground';
      case 'read':
        return 'bg-accent text-accent-foreground';
      case 'archived':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome, {user?.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>
              View Portfolio
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-2 border-primary/20">
            <CardHeader className="pb-2">
              <CardDescription>New Messages</CardDescription>
              <CardTitle className="text-3xl text-primary">
                {submissions.filter(s => s.status === 'new').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-2 border-accent/20">
            <CardHeader className="pb-2">
              <CardDescription>Read</CardDescription>
              <CardTitle className="text-3xl text-accent">
                {submissions.filter(s => s.status === 'read').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-2 border-muted/40">
            <CardHeader className="pb-2">
              <CardDescription>Archived</CardDescription>
              <CardTitle className="text-3xl text-muted-foreground">
                {submissions.filter(s => s.status === 'archived').length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Submissions List */}
        {loading ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Loading submissions...</p>
            </CardContent>
          </Card>
        ) : submissions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No submissions yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className={`transition-all hover:shadow-lg ${
                  selectedSubmission?.id === submission.id ? 'border-2 border-primary' : ''
                }`}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <User className="w-5 h-5 text-primary" />
                          <CardTitle className="text-xl">{submission.name}</CardTitle>
                          <Badge className={getStatusColor(submission.status)}>
                            {submission.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {submission.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(submission.created_at), 'PPp')}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {submission.status !== 'read' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(submission.id, 'read')}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Mark Read
                          </Button>
                        )}
                        {submission.status !== 'archived' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(submission.id, 'archived')}
                          >
                            <Archive className="w-4 h-4 mr-2" />
                            Archive
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground whitespace-pre-wrap">{submission.message}</p>
                    {submission.ip_address && (
                      <p className="text-xs text-muted-foreground mt-4">
                        IP: {submission.ip_address}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;