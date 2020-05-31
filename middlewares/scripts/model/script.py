import sys
import joblib
from numpy import load
model = joblib.load('middlewares/scripts/model/lib/finalized_model.sav')

import pandas as pd
import numpy as np
import sklearn
col_names = ["duration","protocol_type","service","flag","src_bytes",
    "dst_bytes","land","wrong_fragment","urgent","hot","num_failed_logins",
    "logged_in","num_compromised","root_shell","su_attempted","num_root",
    "num_file_creations","num_shells","num_access_files","num_outbound_cmds",
    "is_host_login","is_guest_login","count","srv_count","serror_rate",
    "srv_serror_rate","rerror_rate","srv_rerror_rate","same_srv_rate",
    "diff_srv_rate","srv_diff_host_rate","dst_host_count","dst_host_srv_count",
    "dst_host_same_srv_rate","dst_host_diff_srv_rate","dst_host_same_src_port_rate",
    "dst_host_srv_diff_host_rate","dst_host_serror_rate","dst_host_srv_serror_rate",
    "dst_host_rerror_rate","dst_host_srv_rerror_rate","label","level"]



with open("network_packets/" + sys.argv[1] ,'r') as f:
    with open("middlewares/scripts/model/test.csv",'w') as f1:
        next(f) # skip header line
        for line in f:
            f1.write(line)

df = pd.read_csv("middlewares/scripts/model/test.csv", header=None, names = col_names)

from sklearn.preprocessing import LabelEncoder,OneHotEncoder
categorical_columns=['protocol_type', 'service', 'flag']
df_categorical_values = df[categorical_columns]

unique_protocol=sorted(df.protocol_type.unique())
string1 = 'Protocol_type_'
unique_protocol2=[string1 + x for x in unique_protocol]
# service`
unique_service=sorted(df.service.unique())
string2 = 'service_'
unique_service2=[string2 + x for x in unique_service]
# flag
unique_flag=sorted(df.flag.unique())
string3 = 'flag_'
unique_flag2=[string3 + x for x in unique_flag]
# put together
dumcols=unique_protocol2 + unique_service2 + unique_flag2

le=LabelEncoder()
df_categorical_values_enc=df_categorical_values.apply(le.fit_transform)

enc = OneHotEncoder()
df_categorical_values_encenc = enc.fit_transform(df_categorical_values_enc)
df_cat_data = pd.DataFrame(df_categorical_values_encenc.toarray(),columns=dumcols)

import pickle 
pkl_file = open('middlewares/scripts/model/lib/encodingservice.pkl', 'rb')
trainservice = pickle.load(pkl_file) 
pkl_file.close()
pkl_file = open('middlewares/scripts/model/lib/encodingproto.pkl', 'rb')
trainproto = pickle.load(pkl_file) 
pkl_file.close()
pkl_file = open('middlewares/scripts/model/lib/encodingflag.pkl', 'rb')
trainflag = pickle.load(pkl_file) 
pkl_file.close()

testservice=df['service'].tolist()
testflag=df['service'].tolist()
testproto=df['protocol_type'].tolist()

difference_s=list(set(trainservice) - set(testservice))
string = 'service_'
difference=[string + x for x in difference_s]
for col in difference:
    df_cat_data[col] = 0

difference_p=list(set(trainproto) - set(testproto))
string = 'Protocol_type_'
difference_pr=[string + x for x in difference_p]
for col in difference_pr:
    df_cat_data[col] = 0


difference_f=list(set(trainflag) - set(testflag))
string = 'flag_'
difference_ff=[string + x for x in difference_f]
for col in difference_ff:
    df_cat_data[col] = 0


newdf=df.join(df_cat_data)
newdf.drop('flag', axis=1, inplace=True)
newdf.drop('protocol_type', axis=1, inplace=True)
newdf.drop('service', axis=1, inplace=True)
newdf.drop('level', axis=1, inplace=True)
labeldf=newdf['label']
newlabeldf=labeldf.replace({ 'normal' : 0, 'neptune' : 1 ,'back': 1, 'land': 1, 'pod': 1, 'smurf': 1, 'teardrop': 1,'mailbomb': 1, 'apache2': 1, 'processtable': 1, 'udpstorm': 1, 'worm': 1,
                           'ipsweep' : 2,'nmap' : 2,'portsweep' : 2,'satan' : 2,'mscan' : 2,'saint' : 2
                           ,'ftp_write': 3,'guess_passwd': 3,'imap': 3,'multihop': 3,'phf': 3,'spy': 3,'warezclient': 3,'warezmaster': 3,'sendmail': 3,'named': 3,'snmpgetattack': 3,'snmpguess': 3,'xlock': 3,'xsnoop': 3,'httptunnel': 3,
                           'buffer_overflow': 4,'loadmodule': 4,'perl': 4,'rootkit': 4,'ps': 4,'sqlattack': 4,'xterm': 4})
newdf['label'] = newlabeldf
newdf_X=newdf.drop(columns='label')
newdf_Y=newlabeldf

newdf_X=newdf_X[['duration', 'src_bytes', 'dst_bytes', 'land', 'wrong_fragment', 'urgent', 'hot', 'num_failed_logins', 'logged_in', 'num_compromised', 'root_shell', 'su_attempted', 'num_root', 'num_file_creations', 'num_shells', 'num_access_files', 'num_outbound_cmds', 'is_host_login', 'is_guest_login', 'count', 'srv_count', 'serror_rate', 'srv_serror_rate', 'rerror_rate', 'srv_rerror_rate', 'same_srv_rate', 'diff_srv_rate', 'srv_diff_host_rate', 'dst_host_count', 'dst_host_srv_count', 'dst_host_same_srv_rate', 'dst_host_diff_srv_rate', 'dst_host_same_src_port_rate', 'dst_host_srv_diff_host_rate', 'dst_host_serror_rate', 'dst_host_srv_serror_rate', 'dst_host_rerror_rate', 'dst_host_srv_rerror_rate', 'Protocol_type_icmp', 'Protocol_type_tcp', 'Protocol_type_udp', 'service_IRC', 'service_X11', 'service_Z39_50', 'service_aol', 'service_auth', 'service_bgp', 'service_courier', 'service_csnet_ns', 'service_ctf', 'service_daytime', 'service_discard', 'service_domain', 'service_domain_u', 'service_echo', 'service_eco_i', 'service_ecr_i', 'service_efs', 'service_exec', 'service_finger', 'service_ftp', 'service_ftp_data', 'service_gopher', 'service_harvest', 'service_hostnames', 'service_http', 'service_http_2784', 'service_http_443', 'service_http_8001', 'service_imap4', 'service_iso_tsap', 'service_klogin', 'service_kshell', 'service_ldap', 'service_link', 'service_login', 'service_mtp', 'service_name', 'service_netbios_dgm', 'service_netbios_ns', 'service_netbios_ssn', 'service_netstat', 'service_nnsp', 'service_nntp', 'service_ntp_u', 'service_other', 'service_pm_dump', 'service_pop_2', 'service_pop_3', 'service_printer', 'service_private', 'service_red_i', 'service_remote_job', 'service_rje', 'service_shell', 'service_smtp', 'service_sql_net', 'service_ssh', 'service_sunrpc', 'service_supdup', 'service_systat', 'service_telnet', 'service_tftp_u', 'service_tim_i', 'service_time', 'service_urh_i', 'service_urp_i', 'service_uucp', 'service_uucp_path', 'service_vmnet', 'service_whois', 'flag_OTH', 'flag_REJ', 'flag_RSTO', 'flag_RSTOS0', 'flag_RSTR', 'flag_S0', 'flag_S1', 'flag_S2', 'flag_S3', 'flag_SF', 'flag_SH']]

colNames=list(newdf_X)

rfecolname_rand=['src_bytes', 'dst_bytes', 'count', 'srv_count', 'same_srv_rate', 'diff_srv_rate', 'dst_host_srv_count', 'dst_host_same_srv_rate', 'dst_host_diff_srv_rate', 'dst_host_same_src_port_rate', 'dst_host_serror_rate', 'Protocol_type_icmp', 'flag_SF']
rfecolindex_rand=list(newdf_X.columns.get_loc(c) for c in rfecolname_rand if c in colNames)

# from sklearn.preprocessing import StandardScaler
# sc_x = StandardScaler()
# newdf_X = sc_x.fit_transform(newdf_X)

# from sklearn.externals.joblib import load   
# from joblib import load

sc= pickle.load(open('middlewares/scripts/model/lib/std_scaler.pkl','rb'))
newdf_X = sc.transform(newdf_X)

X_test2=newdf_X[:,rfecolindex_rand]

result = model.predict(X_test2)

pre= pd.DataFrame(data=result)
pre=pre.replace({ 0: 'normal' , 1:'DOS', 2:'probe' ,3: 'R2l',4 :'U2l'})
result=pre.to_numpy()

ans = result[0]

print(ans[0])