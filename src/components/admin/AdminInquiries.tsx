import { MessageSquare, Eye, EyeOff } from "lucide-react";
import { Inquiry } from "./types";

interface AdminInquiriesProps {
  inquiries: Inquiry[];
  onToggleRead: (id: string, currentRead: boolean) => void;
}

const AdminInquiries = ({ inquiries, onToggleRead }: AdminInquiriesProps) => {
  if (inquiries.length === 0) {
    return (
      <div className="bg-card rounded-lg p-10 text-center shadow-steel">
        <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">No inquiries yet. They'll appear here when customers submit the Get Quote form.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {inquiries.map((inq) => (
        <div key={inq.id} className={`bg-card rounded-lg p-5 shadow-steel border-l-4 ${inq.is_read ? "border-l-border" : "border-l-gold"}`}>
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{inq.name}</h3>
                {!inq.is_read && <span className="bg-gold text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-medium">NEW</span>}
              </div>
              <p className="text-sm text-muted-foreground">{inq.email} {inq.phone && `• ${inq.phone}`}</p>
              {inq.company && <p className="text-sm text-muted-foreground">{inq.company} {inq.country && `• ${inq.country}`}</p>}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{new Date(inq.created_at).toLocaleString()}</span>
              <button onClick={() => onToggleRead(inq.id, inq.is_read)} className="p-1.5 text-muted-foreground hover:text-gold transition-colors" title={inq.is_read ? "Mark unread" : "Mark read"}>
                {inq.is_read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {inq.product_interest && <p className="text-sm text-gold mb-2">🏷️ {inq.product_interest}</p>}
          <p className="text-sm text-foreground/80 whitespace-pre-wrap">{inq.message}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminInquiries;
